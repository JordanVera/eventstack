'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { RichTextEditor } from '@/components/ui/rich-text-editor';

interface DescriptionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialContent: string;
  onSave: (content: string) => void;
}

export function DescriptionModal({
  open,
  onOpenChange,
  initialContent,
  onSave,
}: DescriptionModalProps) {
  const [content, setContent] = useState(initialContent);

  const handleSave = () => {
    onSave(content);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-black border-gray-800">
        <DialogHeader>
          <DialogTitle className="text-white">Description</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <p className="text-sm text-gray-400 mb-4">e.g. Please be on time for the DJ at 10pm!</p>
          <RichTextEditor
            content={content}
            onChange={setContent}
            placeholder="Add event description..."
          />
        </div>
        <div className="flex justify-end mt-6">
          <Button
            onClick={handleSave}
            className="bg-white text-black hover:bg-gray-200 px-8 rounded-full"
          >
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
