import axios from 'axios';

const agent = axios.create({
  baseURL: `https://milow6-1979.restdb.io/rest`,
  headers: {
    'cache-control': 'no-cache',
    'x-apikey': '5f7618b7ed97473d24a5ced6'
  }
});

export const cancelsAgent = {
  create: async (name: string) => {
    try {
      await agent.post('/cancels', {
        name
      });
    } catch (err) {
      console.error(err);
    }
  }
};

interface Slot {
  _id: string;
  free: number;
}

export const slotsAgent = {
  all: async () => agent.get('/slots'),
  byId: async (id: string) => agent.get(`/slots/${id}`),
  patch: async (slot: Slot) =>
    agent.patch(`/slots/${slot._id}`, { free: slot.free })
};

interface Reservation {
  code: string;
  slot: number;
  name: string;
}

export const reservationsAgent = {
  create: async (reservation: Reservation) =>
    agent.post('/reservations', reservation)
};
