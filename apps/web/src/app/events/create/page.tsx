'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import {
  MapPin,
  Globe,
  Ticket as TicketIcon,
  Users,
  Star,
  Video,
  Image as ImageIcon,
  Settings,
  Edit,
  Plus,
  Eye,
  EyeOff,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { DateTimePicker } from '@/components/ui/date-time-picker';
import { DescriptionModal } from '@/components/DescriptionModal';
import { TicketModal, TicketData } from '@/components/TicketModal';
import { useSession } from 'next-auth/react';
import { trpc } from '@/lib/trpc-client';

export default function CreateEventPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [isSaving, setIsSaving] = useState(false);
  const createEvent = trpc.events.create.useMutation();

  // Event basic info
  const [eventName, setEventName] = useState('My Event Name');
  const [shortSummary, setShortSummary] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date(Date.now() + 2 * 60 * 60 * 1000));
  const [timezone, setTimezone] = useState('GMT -5');
  const [isRecurringSeries, setIsRecurringSeries] = useState(false);

  // Location details
  const [location, setLocation] = useState('');
  const [venueName, setVenueName] = useState('');

  // Tickets
  const [tickets, setTickets] = useState<TicketData[]>([
    {
      name: 'Default Ticket',
      description: '',
      grossPrice: 10.0,
      displayPrice: '$10.00',
      quantity: null,
      isUnlimited: true,
      limitSalesPeriod: false,
      limitTicketValidity: false,
      limitPurchaseQuantity: false,
    },
  ]);
  const [activeTab, setActiveTab] = useState<'sell' | 'rsvp'>('sell');

  // Features
  const [guestlistEnabled, setGuestlistEnabled] = useState(false);
  const [eventFeaturesEnabled, setEventFeaturesEnabled] = useState(false);
  const [youtubeVideoEnabled, setYoutubeVideoEnabled] = useState(false);
  const [youtubeVideoUrl, setYoutubeVideoUrl] = useState('');
  const [imageGalleryEnabled, setImageGalleryEnabled] = useState(false);
  const [imageGalleryUrls, setImageGalleryUrls] = useState<string[]>([]);

  // Page settings
  const [showOnExplore, setShowOnExplore] = useState(true);
  const [isPasswordProtected, setIsPasswordProtected] = useState(false);
  const [eventPassword, setEventPassword] = useState('');

  // Modals
  const [descriptionModalOpen, setDescriptionModalOpen] = useState(false);
  const [summaryModalOpen, setSummaryModalOpen] = useState(false);
  const [ticketModalOpen, setTicketModalOpen] = useState(false);
  const [editingTicketIndex, setEditingTicketIndex] = useState<number | null>(null);

  const handleAddTicket = () => {
    setEditingTicketIndex(null);
    setTicketModalOpen(true);
  };

  const handleEditTicket = (index: number) => {
    setEditingTicketIndex(index);
    setTicketModalOpen(true);
  };

  const handleSaveTicket = (ticket: TicketData) => {
    if (editingTicketIndex !== null) {
      const newTickets = [...tickets];
      newTickets[editingTicketIndex] = ticket;
      setTickets(newTickets);
    } else {
      setTickets([...tickets, ticket]);
    }
  };

  const handleSaveEvent = async () => {
    if (!session?.user?.id) {
      alert('You must be logged in to create an event');
      return;
    }

    setIsSaving(true);
    try {
      await createEvent.mutateAsync({
        title: eventName,
        shortSummary,
        description,
        startDate,
        endDate,
        timezone,
        isRecurringSeries,
        location,
        venueName,
        tickets: tickets.map((ticket) => ({
          name: ticket.name,
          description: ticket.description,
          grossPrice: ticket.grossPrice,
          displayPrice: ticket.displayPrice,
          quantity: ticket.isUnlimited ? null : ticket.quantity,
          isUnlimited: ticket.isUnlimited,
          limitSalesPeriod: ticket.limitSalesPeriod,
          salesStartDate: ticket.salesStartDate,
          salesEndDate: ticket.salesEndDate,
          limitTicketValidity: ticket.limitTicketValidity,
          validityStartDate: ticket.validityStartDate,
          validityEndDate: ticket.validityEndDate,
          limitPurchaseQuantity: ticket.limitPurchaseQuantity,
          minPurchaseQuantity: ticket.minPurchaseQuantity,
          maxPurchaseQuantity: ticket.maxPurchaseQuantity,
        })),
        guestlistEnabled,
        eventFeaturesEnabled,
        youtubeVideoEnabled,
        youtubeVideoUrl,
        imageGalleryEnabled,
        imageGalleryUrls: JSON.stringify(imageGalleryUrls),
        showOnExplore,
        isPasswordProtected,
        eventPassword,
        userId: session.user.id,
      });

      // Redirect to events list or event detail page
      router.push('/events');
    } catch (error) {
      console.error('Error saving event:', error);
      alert('Failed to create event. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto grid grid-cols-12 gap-4 py-8">
        <section className="col-span-7">
          {/* Tabs */}
          <div className="mb-8 flex gap-4">
            <Button
              variant={activeTab === 'sell' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('sell')}
              className={`flex-1 rounded-full ${
                activeTab === 'sell' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Sell Tickets
            </Button>
            <Button
              variant={activeTab === 'rsvp' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('rsvp')}
              className={`flex-1 rounded-full ${
                activeTab === 'rsvp' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-white'
              }`}
            >
              RSVP
            </Button>
          </div>

          {/* Event Name */}
          <div className="mb-8">
            <Input
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              className="border-none bg-transparent px-0 py-12 !text-5xl font-bold text-white placeholder-zinc-600 placeholder:text-5xl focus-visible:ring-0"
              placeholder="My Event Name"
            />
          </div>

          {/* Short Summary */}
          <div className="mb-8">
            <Button
              variant="ghost"
              onClick={() => setSummaryModalOpen(true)}
              className="flex cursor-pointer items-center gap-2 rounded-md px-4 py-2 text-white hover:bg-zinc-900 hover:text-white"
            >
              <Plus className="h-4 w-4" />
              Short Summary
            </Button>
          </div>

          {/* Dates */}
          <div className="mb-8 border-b border-b-zinc-800 py-6 pb-14">
            <div className="mb-4 flex items-center gap-2">
              <span className="text-white">📅 Dates</span>
            </div>

            <div className="flex justify-between gap-4 space-y-4 rounded-t-md border-b-1 border-b-black bg-zinc-900 p-2">
              <Label className="mb-2 text-sm font-normal">Start</Label>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-zinc-500">{timezone}</span>
                  <DateTimePicker
                    date={startDate}
                    onDateChange={(date) => setStartDate(date || new Date())}
                    className="flex-1"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-between gap-4 space-y-4 rounded-b-md bg-zinc-900 p-2">
              <Label className="mb-2 flex items-center gap-2 text-sm font-normal">
                End
                <EyeOff className="h-4 w-4 text-zinc-500" />
              </Label>
              <div className="flex items-center gap-2">
                <span className="text-sm text-zinc-500">{timezone}</span>
                <DateTimePicker
                  date={endDate}
                  onDateChange={(date) => setEndDate(date || new Date())}
                  className="flex-1"
                />
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between rounded-lg bg-zinc-900 p-3">
              <div className="flex items-center gap-2">
                <span className="text-sm text-white">🔁 Recurring Series</span>
              </div>
              <Button
                variant="ghost"
                className="h-auto px-3 py-1 text-zinc-400 hover:text-white"
                onClick={() => setIsRecurringSeries(!isRecurringSeries)}
              >
                {isRecurringSeries ? 'Yes' : 'No'}
              </Button>
            </div>
          </div>

          {/* Event Details */}
          <div className="mb-8 rounded-lg py-6">
            <div className="mb-4 flex items-center gap-2">
              <span className="font-semibold text-white">📋 Event Details</span>
            </div>

            <div className="space-y-3">
              <Button
                variant="ghost"
                onClick={() => setDescriptionModalOpen(true)}
                className="w-full cursor-pointer justify-start rounded-md bg-zinc-900 p-6 text-white hover:bg-zinc-800 hover:text-white"
              >
                <Edit className="mr-2 h-4 w-4" />
                Add Description
              </Button>

              <Button
                variant="ghost"
                className="w-full cursor-pointer justify-start rounded-md bg-zinc-900 p-6 text-white hover:bg-zinc-800 hover:text-white"
                onClick={() => {}}
              >
                <MapPin className="mr-2 h-4 w-4" />
                Location
              </Button>
              {location && (
                <Input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="border-zinc-700 bg-zinc-800"
                  placeholder="Enter location"
                />
              )}

              <Button
                variant="ghost"
                className="w-full cursor-pointer justify-start rounded-md bg-zinc-900 p-6 text-white hover:bg-zinc-800 hover:text-white"
                onClick={() => {}}
              >
                <Globe className="mr-2 h-4 w-4" />
                Venue Name
              </Button>
              {venueName && (
                <Input
                  value={venueName}
                  onChange={(e) => setVenueName(e.target.value)}
                  className="border-zinc-700 bg-zinc-800"
                  placeholder="Enter venue name"
                />
              )}
            </div>
          </div>

          {/* Tickets */}
          <div className="mb-8 rounded-lg bg-zinc-900 p-6">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TicketIcon className="h-5 w-5" />
                <span className="font-semibold text-white">Tickets</span>
              </div>
              <a
                href="#"
                className="flex items-center gap-1 text-sm text-zinc-400 hover:text-white"
              >
                Need help launching your paid event? Join our Posh Starter Kit Orientation →
              </a>
            </div>

            <div className="space-y-3">
              {tickets.map((ticket, index) => (
                <div
                  key={index}
                  className="hover:bg-zinc-750 flex cursor-pointer items-center justify-between rounded-lg bg-zinc-800 p-4"
                  onClick={() => handleEditTicket(index)}
                >
                  <div>
                    <div className="font-medium text-white">{ticket.name}</div>
                    <div className="text-sm text-zinc-400">{ticket.displayPrice}</div>
                  </div>
                  <Edit className="h-4 w-4 text-zinc-400" />
                </div>
              ))}

              <Button
                variant="ghost"
                onClick={handleAddTicket}
                className="w-full justify-center rounded-md border-2 border-dashed border-zinc-700 py-8 text-white hover:bg-zinc-800"
              >
                <Plus className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Additional Features */}
          <div className="mb-8 space-y-4">
            <FeatureToggle
              icon={<Users className="h-5 w-5" />}
              label="Guestlist"
              enabled={guestlistEnabled}
              onToggle={setGuestlistEnabled}
            />

            <FeatureToggle
              icon={<Star className="h-5 w-5" />}
              label="Event Features"
              enabled={eventFeaturesEnabled}
              onToggle={setEventFeaturesEnabled}
            />

            <FeatureToggle
              icon={<Video className="h-5 w-5" />}
              label="YouTube Video"
              enabled={youtubeVideoEnabled}
              onToggle={setYoutubeVideoEnabled}
            />

            <FeatureToggle
              icon={<ImageIcon className="h-5 w-5" />}
              label="Image Gallery"
              enabled={imageGalleryEnabled}
              onToggle={setImageGalleryEnabled}
            />
          </div>

          {/* Page Settings */}
          <div className="mb-8 rounded-lg bg-zinc-900 p-6">
            <div className="mb-4 flex items-center gap-2">
              <Settings className="h-5 w-5" />
              <span className="font-semibold text-white">Page Settings</span>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-lg bg-zinc-800 p-4">
                <div className="flex items-center gap-2">
                  <Label className="text-white">Show on Explore</Label>
                  <span className="text-xs text-zinc-500">(i)</span>
                </div>
                <Switch checked={showOnExplore} onCheckedChange={setShowOnExplore} />
              </div>

              <div className="flex items-center justify-between rounded-lg bg-zinc-800 p-4">
                <div className="flex items-center gap-2">
                  <Label className="text-white">Password Protected Event</Label>
                  <span className="text-xs text-zinc-500">(i)</span>
                </div>
                <Switch checked={isPasswordProtected} onCheckedChange={setIsPasswordProtected} />
              </div>

              {isPasswordProtected && (
                <div className="pl-4">
                  <Input
                    type="password"
                    value={eventPassword}
                    onChange={(e) => setEventPassword(e.target.value)}
                    className="border-zinc-700 bg-zinc-800"
                    placeholder="Enter event password"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Save Button */}
          <div className="mt-8 flex justify-center gap-4">
            <Button
              onClick={handleSaveEvent}
              disabled={isSaving}
              className="rounded-full bg-white px-12 py-6 text-lg font-semibold text-black hover:bg-zinc-200"
            >
              {isSaving ? 'Creating Event...' : 'Create Event'}
            </Button>
          </div>
        </section>
        <aside className="col-span-5">
          <h2 className="text-2xl font-bold">Event Details</h2>
        </aside>
      </div>

      {/* Modals */}
      <DescriptionModal
        open={descriptionModalOpen}
        onOpenChange={setDescriptionModalOpen}
        initialContent={description}
        onSave={setDescription}
      />

      <DescriptionModal
        open={summaryModalOpen}
        onOpenChange={setSummaryModalOpen}
        initialContent={shortSummary}
        onSave={setShortSummary}
      />

      <TicketModal
        open={ticketModalOpen}
        onOpenChange={setTicketModalOpen}
        initialData={editingTicketIndex !== null ? tickets[editingTicketIndex] : undefined}
        onSave={handleSaveTicket}
      />
    </div>
  );
}

interface FeatureToggleProps {
  icon: React.ReactNode;
  label: string;
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
}

function FeatureToggle({ icon, label, enabled, onToggle }: FeatureToggleProps) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-900 p-4">
      <div className="flex items-center gap-3">
        {icon}
        <Label className="text-white">{label}</Label>
        <span className="text-xs text-zinc-500">(i)</span>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onToggle(!enabled)}
        className="text-zinc-400 hover:text-white"
      >
        {enabled ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
      </Button>
    </div>
  );
}
