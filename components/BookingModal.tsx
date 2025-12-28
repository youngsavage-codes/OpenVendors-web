'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';
import { X, Clock, DollarSign, Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { useToastStore } from '@/store/useToastStore';

interface Service {
  id: number;
  name: string;
  category: string;
  vendor: string;
  vendorId: number;
  image: string;
  price: string;
  duration: string;
  rating: number;
  reviews: number;
  location: string;
  available: boolean;
  description: string;
}

interface BookingModalProps {
  service: Service | null;
  isOpen: boolean;
  onClose: () => void;
  onBookingComplete?: () => void;
}

// Generate time slots (every 30 minutes from 9 AM to 6 PM)
const generateTimeSlots = () => {
  const slots = [];
  for (let hour = 9; hour < 18; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      const date = new Date();
      const [hours, minutes] = time.split(':');
      date.setHours(parseInt(hours), parseInt(minutes), 0, 0);
      const displayTime = format(date, 'h:mm a');
      slots.push({ value: time, display: displayTime });
    }
  }
  return slots;
};

export default function BookingModal({
  service,
  isOpen,
  onClose,
  onBookingComplete,
}: BookingModalProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const showToast = useToastStore((state) => state.showToast);

  const timeSlots = generateTimeSlots();

  if (!service) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDate || !selectedTime || !name || !email || !phone) {
      showToast('Please fill in all required fields', 'error');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call - replace with actual API call
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate random success/failure for demo (90% success rate)
          const isSuccess = Math.random() > 0.1;
          if (isSuccess) {
            resolve(true);
          } else {
            reject(new Error('Booking failed. Please try again.'));
          }
        }, 1500);
      });

      // Here you would typically send the booking data to your backend
      const bookingData = {
        serviceId: service.id,
        serviceName: service.name,
        vendorId: service.vendorId,
        vendorName: service.vendor,
        date: format(selectedDate, 'yyyy-MM-dd'),
        time: selectedTime,
        name,
        email,
        phone,
        notes,
        price: service.price,
        duration: service.duration,
      };

      console.log('Booking submitted:', bookingData);

      // Show success toast
      showToast(
        `Booking confirmed! We'll send a confirmation email to ${email}`,
        'success'
      );
      
      // Reset form
      setSelectedDate(undefined);
      setSelectedTime('');
      setName('');
      setEmail('');
      setPhone('');
      setNotes('');
      
      onBookingComplete?.();
      
      // Close modal after a short delay to allow user to see the success message
      setTimeout(() => {
        onClose();
      }, 500);
    } catch (error) {
      // Show error toast
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Failed to book appointment. Please try again.';
      showToast(errorMessage, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = selectedDate && selectedTime && name && email && phone;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        <div className="relative">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">Book Appointment</DialogTitle>
              <p className="text-gray-600 mt-2">{service.name} - {service.vendor}</p>
            </DialogHeader>
          </div>

          {/* Content */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Service Summary */}
            <div className="bg-gray-50 rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Service</span>
                <span className="font-semibold">{service.name}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Duration</span>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="font-semibold">{service.duration}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Price</span>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-gray-500" />
                  <span className="font-semibold text-xl">{service.price}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column - Date & Time Selection */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Select Date
                  </label>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => date < new Date()}
                    className="rounded-lg border border-gray-200 p-3"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Select Time
                  </label>
                  <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto p-2 border border-gray-200 rounded-lg">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot.value}
                        type="button"
                        onClick={() => setSelectedTime(slot.value)}
                        className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                          selectedTime === slot.value
                            ? 'bg-black text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {slot.display}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - Contact Information */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Special Requests (Optional)
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black resize-none"
                    placeholder="Any special requests or notes..."
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 bg-gray-100 text-black rounded-full font-medium hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!isFormValid || isSubmitting}
                className="flex-1 px-6 py-3 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Booking...' : 'Confirm Booking'}
              </button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

