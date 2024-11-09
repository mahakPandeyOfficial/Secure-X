export const sendEmergencyData = async ({ videoTracks, audioTracks, location }) => {
    try {
      const formData = new FormData();
      formData.append('location', JSON.stringify(location));
      
      // Mock video/audio files for testing (you'll need actual files from your capture logic)
      const videoFile = new Blob([videoTracks[0]], { type: 'video/mp4' });
      const audioFile = new Blob([audioTracks[0]], { type: 'audio/mpeg' });
  
      formData.append('video', videoFile, 'emergency-video.mp4');
      formData.append('audio', audioFile, 'emergency-audio.mp3');
  
      const response = await fetch('http://localhost:8080/report', {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        console.log('Emergency data sent successfully!');
      } else {
        console.error('Failed to send emergency data');
      }
    } catch (error) {
      console.error('Error sending emergency data:', error);
    }
  };
  