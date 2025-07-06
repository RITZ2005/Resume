
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ContactFooter = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !message) {
      toast({
        title: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    // In real implementation, this would send the message
    toast({
      title: "Message sent!",
      description: "Thanks for your feedback. We'll get back to you soon!",
    });
    setEmail('');
    setMessage('');
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white">
      {/* Contact Section */}
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Contact Form */}
          <div>
            <h3 className="text-3xl font-bold mb-6">
              Have Feedback? Reach Out!
            </h3>
            <p className="text-gray-300 mb-8 text-lg">
              We'd love to hear about your experience and how we can improve TailoredResume.ai
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder-gray-300 focus:border-blue-400"
                />
              </div>
              <div>
                <Textarea
                  placeholder="Your message or feedback"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder-gray-300 focus:border-blue-400 min-h-[120px]"
                />
              </div>
              <Button
                type="submit"
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                <Mail className="w-5 h-5 mr-2" />
                Send Message
              </Button>
            </form>
          </div>

          {/* Company Info */}
          <div className="text-center md:text-left">
            <h4 className="text-2xl font-bold mb-6">
              TailoredResume.ai
            </h4>
            <p className="text-gray-300 mb-8 text-lg leading-relaxed">
              Empowering job seekers with AI-powered resume optimization. 
              Get noticed by recruiters and land your dream job faster.
            </p>
            
            {/* Social Links */}
            <div className="flex justify-center md:justify-start space-x-6 mb-8">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 p-3 rounded-full hover:bg-white/20 transition-colors"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 p-3 rounded-full hover:bg-white/20 transition-colors"
              >
                <Linkedin className="w-6 h-6" />
              </a>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-white/10 rounded-xl p-4">
                <div className="text-2xl font-bold text-blue-400 mb-1">50K+</div>
                <div className="text-sm text-gray-300">Users Helped</div>
              </div>
              <div className="bg-white/10 rounded-xl p-4">
                <div className="text-2xl font-bold text-purple-400 mb-1">98%</div>
                <div className="text-sm text-gray-300">Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-white/20">
        <div className="container mx-auto px-4 py-6 max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm mb-4 md:mb-0">
              © 2025 TailoredResume.ai | Built with{' '}
              <Heart className="inline w-4 h-4 text-red-400 mx-1" />
              for job seekers everywhere
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ContactFooter;
