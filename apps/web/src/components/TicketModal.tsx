'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { RichTextEditor } from '@/components/ui/rich-text-editor';
import { DateTimePicker } from '@/components/ui/date-time-picker';
import { Settings } from 'lucide-react';

export interface TicketData {
  id?: string;
  name: string;
  description: string;
  grossPrice: number;
  displayPrice: string;
  quantity: number | null;
  isUnlimited: boolean;
  limitSalesPeriod: boolean;
  salesStartDate?: Date;
  salesEndDate?: Date;
  limitTicketValidity: boolean;
  validityStartDate?: Date;
  validityEndDate?: Date;
  limitPurchaseQuantity: boolean;
  minPurchaseQuantity?: number;
  maxPurchaseQuantity?: number;
}

interface TicketModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: TicketData;
  onSave: (ticket: TicketData) => void;
}

const defaultTicket: TicketData = {
  name: 'Default Ticket',
  description: '',
  grossPrice: 0,
  displayPrice: 'Free',
  quantity: null,
  isUnlimited: true,
  limitSalesPeriod: false,
  limitTicketValidity: false,
  limitPurchaseQuantity: false,
};

export function TicketModal({ open, onOpenChange, initialData, onSave }: TicketModalProps) {
  const [ticket, setTicket] = useState<TicketData>(initialData || defaultTicket);
  const [showMoreSettings, setShowMoreSettings] = useState(false);

  const updateTicket = (updates: Partial<TicketData>) => {
    setTicket((prev) => ({ ...prev, ...updates }));
  };

  const handleSave = () => {
    onSave(ticket);
    onOpenChange(false);
    setTicket(defaultTicket);
  };

  const handleCancel = () => {
    onOpenChange(false);
    setTicket(defaultTicket);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto border-zinc-800 bg-black">
        <DialogHeader>
          <DialogTitle className="text-white">Create Ticket</DialogTitle>
        </DialogHeader>

        <div className="mt-4 space-y-6">
          {/* Ticket Name and Quantity */}
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <Input
                value={ticket.name}
                onChange={(e) => updateTicket({ name: e.target.value })}
                className="border-zinc-700 bg-zinc-800 text-lg text-white"
                placeholder="Default Ticket"
              />
            </div>
            <div className="flex items-center gap-2 rounded-md border border-zinc-700 bg-zinc-800 px-4 py-2">
              <Label className="text-sm text-zinc-400">QTY</Label>
              <Button
                variant="ghost"
                size="sm"
                className={`${ticket.isUnlimited ? 'bg-zinc-700' : ''} px-3 py-1 text-white`}
                onClick={() => updateTicket({ isUnlimited: !ticket.isUnlimited })}
              >
                {ticket.isUnlimited ? 'Unlimited' : ticket.quantity || 0}
              </Button>
            </div>
          </div>

          {/* Pricing */}
          <div className="flex gap-4">
            <div className="flex-1">
              <Label className="mb-2 flex items-center gap-2 text-sm text-zinc-400">
                Gross Price
                <span className="text-xs text-zinc-500">(i)</span>
              </Label>
              <Input
                value={ticket.displayPrice}
                onChange={(e) => updateTicket({ displayPrice: e.target.value })}
                className="border-zinc-700 bg-zinc-800 text-white"
                placeholder="Free"
              />
            </div>
            <div className="flex-1">
              <Label className="mb-2 flex items-center gap-2 text-sm text-zinc-400">
                Display Price
                <span className="text-xs text-zinc-500">(i)</span>
              </Label>
              <Input
                value={ticket.displayPrice}
                onChange={(e) => updateTicket({ displayPrice: e.target.value })}
                className="border-zinc-700 bg-zinc-800 text-white"
                placeholder="Free"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <Label className="mb-2 text-sm text-zinc-400">Description</Label>
            <div className="rounded-md border border-zinc-700 bg-zinc-800">
              <RichTextEditor
                content={ticket.description}
                onChange={(content) => updateTicket({ description: content })}
                placeholder="Add ticket description..."
                className="min-h-[150px]"
              />
            </div>
          </div>

          {/* Ticket Settings */}
          <div>
            <div className="mb-4 flex items-center justify-between">
              <Label className="text-white">Ticket Settings</Label>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowMoreSettings(!showMoreSettings)}
                className="text-zinc-400 hover:text-white"
              >
                <Settings className="mr-2 h-4 w-4" />
                More settings
              </Button>
            </div>

            <div className="space-y-4">
              {/* Limit Sales Period */}
              <div className="flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-900 p-4">
                <div className="flex items-center gap-2">
                  <Label className="text-white">Limit Sales Period</Label>
                  <span className="text-xs text-zinc-500">(i)</span>
                </div>
                <Switch
                  checked={ticket.limitSalesPeriod}
                  onCheckedChange={(checked) => updateTicket({ limitSalesPeriod: checked })}
                />
              </div>

              {ticket.limitSalesPeriod && (
                <div className="space-y-2 pl-4">
                  <div>
                    <Label className="mb-2 text-sm text-zinc-400">Sales Start</Label>
                    <DateTimePicker
                      date={ticket.salesStartDate}
                      onDateChange={(date) => updateTicket({ salesStartDate: date })}
                    />
                  </div>
                  <div>
                    <Label className="mb-2 text-sm text-zinc-400">Sales End</Label>
                    <DateTimePicker
                      date={ticket.salesEndDate}
                      onDateChange={(date) => updateTicket({ salesEndDate: date })}
                    />
                  </div>
                </div>
              )}

              {/* Limit Ticket Validity */}
              <div className="flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-900 p-4">
                <div className="flex items-center gap-2">
                  <Label className="text-white">Limit Ticket Validity</Label>
                  <span className="text-xs text-zinc-500">(i)</span>
                </div>
                <Switch
                  checked={ticket.limitTicketValidity}
                  onCheckedChange={(checked) => updateTicket({ limitTicketValidity: checked })}
                />
              </div>

              {ticket.limitTicketValidity && (
                <div className="space-y-2 pl-4">
                  <div>
                    <Label className="mb-2 text-sm text-zinc-400">Valid From</Label>
                    <DateTimePicker
                      date={ticket.validityStartDate}
                      onDateChange={(date) => updateTicket({ validityStartDate: date })}
                    />
                  </div>
                  <div>
                    <Label className="mb-2 text-sm text-zinc-400">Valid Until</Label>
                    <DateTimePicker
                      date={ticket.validityEndDate}
                      onDateChange={(date) => updateTicket({ validityEndDate: date })}
                    />
                  </div>
                </div>
              )}

              {/* Limit Purchase Quantity */}
              <div className="flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-900 p-4">
                <div className="flex items-center gap-2">
                  <Label className="text-white">Limit Purchase Quantity</Label>
                  <span className="text-xs text-zinc-500">(i)</span>
                </div>
                <Switch
                  checked={ticket.limitPurchaseQuantity}
                  onCheckedChange={(checked) => updateTicket({ limitPurchaseQuantity: checked })}
                />
              </div>

              {ticket.limitPurchaseQuantity && (
                <div className="flex gap-4 pl-4">
                  <div className="flex-1">
                    <Label className="mb-2 text-sm text-zinc-400">Min Quantity</Label>
                    <Input
                      type="number"
                      value={ticket.minPurchaseQuantity || ''}
                      onChange={(e) =>
                        updateTicket({
                          minPurchaseQuantity: parseInt(e.target.value) || 1,
                        })
                      }
                      className="border-zinc-700 bg-zinc-800 text-white"
                      placeholder="1"
                    />
                  </div>
                  <div className="flex-1">
                    <Label className="mb-2 text-sm text-zinc-400">Max Quantity</Label>
                    <Input
                      type="number"
                      value={ticket.maxPurchaseQuantity || ''}
                      onChange={(e) =>
                        updateTicket({
                          maxPurchaseQuantity: parseInt(e.target.value) || 10,
                        })
                      }
                      className="border-zinc-700 bg-zinc-800 text-white"
                      placeholder="10"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-col items-center gap-3">
          <Button
            onClick={handleSave}
            className="w-full max-w-md rounded-full bg-white px-12 text-black hover:bg-zinc-200"
          >
            Create Ticket
          </Button>
          <Button onClick={handleCancel} variant="ghost" className="text-zinc-400 hover:text-white">
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
