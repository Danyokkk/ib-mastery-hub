import React, { useRef, useState } from 'react';

interface ImageUploaderProps {
  avatarUrl: string;
  onUpload: (newUrl: string) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ avatarUrl, onUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert("File is too large. Maximum size is 5MB.");
        return;
      }
      if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
        alert("Invalid file type. Please upload a JPG, PNG, or WEBP image.");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        onUpload(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerateAvatar = () => {
      const seed = Math.random().toString(36).substring(7);
      const newUrl = `https://api.dicebear.com/8.x/avataaars/svg?seed=${seed}`;
      onUpload(newUrl);
  }


  return (
    <div className="w-32 h-32 relative group">
      <img src={avatarUrl} alt="User avatar" className="w-full h-full object-cover rounded-full" />
      <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="flex items-center space-x-2">
          <button 
              onClick={() => fileInputRef.current?.click()} 
              title="Upload from device"
              className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm shadow-md flex items-center justify-center text-slate-600 hover:bg-slate-100 transition"
          >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
          </button>
           <button 
              onClick={handleGenerateAvatar} 
              title="Generate new avatar"
              className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm shadow-md flex items-center justify-center text-slate-600 hover:bg-slate-100 transition"
          >
               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h5M5.523 13.611A6.004 6.004 0 0112 6.002a6.002 6.002 0 11-6.477 7.609M20 20v-5h-5" /><path strokeLinecap="round" strokeLinejoin="round" d="M18.477 10.389a6.004 6.004 0 01-6.477 7.61 6.002 6.002 0 116.477-7.61v0z" /></svg>
          </button>
        </div>
      </div>
       <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/png, image/jpeg, image/webp"
        className="hidden"
      />
    </div>
  );
};

export default ImageUploader;
