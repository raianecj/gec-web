// src/services/event.js
export const registerForEvent = async (eventId) => {
    const session = JSON.parse(localStorage.getItem('authToken'));
    if (!session) {
      alert("Você precisa estar logado para se inscrever em um evento.");
      return;
    }
  
    const response = await fetch(`/api/events/${eventId}/register`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${session.token}`,
      },
    });
    
    if (response.ok) {
      alert("Inscrição realizada com sucesso!");
    } else {
      alert("Erro ao realizar inscrição.");
    }
  };
  