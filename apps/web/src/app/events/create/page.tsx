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
      <div className="container mx-auto px-4 py-8 grid grid-cols-12 gap-4">
        <section className="col-span-8">
          {/* Tabs */}
          <div className="flex gap-4 mb-8">
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
              className="bg-transparent border-none !text-5xl placeholder:text-5xl font-bold text-white placeholder-zinc-600 px-0 focus-visible:ring-0 py-12"
              placeholder="My Event Name"
            />
          </div>

          {/* Short Summary */}
          <div className="mb-8">
            <Button
              variant="ghost"
              onClick={() => setSummaryModalOpen(true)}
              className="flex items-center gap-2 text-white hover:bg-zinc-900 px-4 py-2 rounded-md"
            >
              <Plus className="h-4 w-4" />
              Short Summary
            </Button>
          </div>

          {/* Dates */}
          <div className="mb-8 bg-zinc-900 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-white font-semibold">📅 Dates</span>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="text-zinc-400 text-sm mb-2">Start</Label>
                <div className="flex items-center gap-2">
                  <span className="text-zinc-500 text-sm">{timezone}</span>
                  <DateTimePicker
                    date={startDate}
                    onDateChange={(date) => setStartDate(date || new Date())}
                    className="flex-1"
                  />
                </div>
              </div>

              <div>
                <Label className="text-zinc-400 text-sm mb-2 flex items-center gap-2">
                  End
                  <EyeOff className="h-4 w-4 text-zinc-500" />
                </Label>
                <div className="flex items-center gap-2">
                  <span className="text-zinc-500 text-sm">{timezone}</span>
                  <DateTimePicker
                    date={endDate}
                    onDateChange={(date) => setEndDate(date || new Date())}
                    className="flex-1"
                  />
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between p-3 bg-zinc-800 rounded-lg">
              <div className="flex items-center gap-2">
                <span className="text-white text-sm">🔁 Recurring Series</span>
              </div>
              <Button
                variant="ghost"
                className="text-zinc-400 hover:text-white px-3 py-1 h-auto"
                onClick={() => setIsRecurringSeries(!isRecurringSeries)}
              >
                {isRecurringSeries ? 'Yes' : 'No'}
              </Button>
            </div>
          </div>

          {/* Event Details */}
          <div className="mb-8 bg-zinc-900 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-white font-semibold">📋 Event Details</span>
            </div>

            <div className="space-y-3">
              <Button
                variant="ghost"
                onClick={() => setDescriptionModalOpen(true)}
                className="w-full justify-start text-white hover:bg-zinc-800 px-4 py-3 rounded-md"
              >
                <Edit className="h-4 w-4 mr-2" />
                Add Description
              </Button>

              <Button
                variant="ghost"
                className="w-full justify-start text-white hover:bg-zinc-800 px-4 py-3 rounded-md"
                onClick={() => {}}
              >
                <MapPin className="h-4 w-4 mr-2" />
                Location
              </Button>
              {location && (
                <Input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="bg-zinc-800 border-zinc-700"
                  placeholder="Enter location"
                />
              )}

              <Button
                variant="ghost"
                className="w-full justify-start text-white hover:bg-zinc-800 px-4 py-3 rounded-md"
                onClick={() => {}}
              >
                <Globe className="h-4 w-4 mr-2" />
                Venue Name
              </Button>
              {venueName && (
                <Input
                  value={venueName}
                  onChange={(e) => setVenueName(e.target.value)}
                  className="bg-zinc-800 border-zinc-700"
                  placeholder="Enter venue name"
                />
              )}
            </div>
          </div>

          {/* Tickets */}
          <div className="mb-8 bg-zinc-900 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <TicketIcon className="h-5 w-5" />
                <span className="text-white font-semibold">Tickets</span>
              </div>
              <a
                href="#"
                className="text-sm text-zinc-400 hover:text-white flex items-center gap-1"
              >
                Need help launching your paid event? Join our Posh Starter Kit Orientation →
              </a>
            </div>

            <div className="space-y-3">
              {tickets.map((ticket, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-zinc-800 rounded-lg hover:bg-zinc-750 cursor-pointer"
                  onClick={() => handleEditTicket(index)}
                >
                  <div>
                    <div className="text-white font-medium">{ticket.name}</div>
                    <div className="text-zinc-400 text-sm">{ticket.displayPrice}</div>
                  </div>
                  <Edit className="h-4 w-4 text-zinc-400" />
                </div>
              ))}

              <Button
                variant="ghost"
                onClick={handleAddTicket}
                className="w-full justify-center text-white hover:bg-zinc-800 py-8 rounded-md border-2 border-dashed border-zinc-700"
              >
                <Plus className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Additional Features */}
          <div className="space-y-4 mb-8">
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
          <div className="mb-8 bg-zinc-900 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <Settings className="h-5 w-5" />
              <span className="text-white font-semibold">Page Settings</span>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-zinc-800 rounded-lg">
                <div className="flex items-center gap-2">
                  <Label className="text-white">Show on Explore</Label>
                  <span className="text-zinc-500 text-xs">(i)</span>
                </div>
                <Switch checked={showOnExplore} onCheckedChange={setShowOnExplore} />
              </div>

              <div className="flex items-center justify-between p-4 bg-zinc-800 rounded-lg">
                <div className="flex items-center gap-2">
                  <Label className="text-white">Password Protected Event</Label>
                  <span className="text-zinc-500 text-xs">(i)</span>
                </div>
                <Switch checked={isPasswordProtected} onCheckedChange={setIsPasswordProtected} />
              </div>

              {isPasswordProtected && (
                <div className="pl-4">
                  <Input
                    type="password"
                    value={eventPassword}
                    onChange={(e) => setEventPassword(e.target.value)}
                    className="bg-zinc-800 border-zinc-700"
                    placeholder="Enter event password"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-center gap-4 mt-8">
            <Button
              onClick={handleSaveEvent}
              disabled={isSaving}
              className="bg-white text-black hover:bg-zinc-200 px-12 py-6 rounded-full text-lg font-semibold"
            >
              {isSaving ? 'Creating Event...' : 'Create Event'}
            </Button>
          </div>
        </section>
        <aside className="col-span-4">
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
    <div className="flex items-center justify-between p-4 bg-zinc-900 rounded-lg border border-zinc-800">
      <div className="flex items-center gap-3">
        {icon}
        <Label className="text-white">{label}</Label>
        <span className="text-zinc-500 text-xs">(i)</span>
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
