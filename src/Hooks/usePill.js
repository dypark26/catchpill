import { useMutation } from 'react-query';
import { dbService } from '../shared/firebase';
import { addDoc, collection } from 'firebase/firestore';

const addPill = (pill) => {
  return addDoc(collection(dbService, 'pill'), pill);
};

export const useAddPillData = () => {
  return useMutation(addPill);
};
