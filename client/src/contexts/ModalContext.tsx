import { ReactNode, createContext, useState, useEffect } from "react";
import { putUser } from "../service/apiService";

/* Modal Context */

export type ModalData = {
  title: string,
  text: string,
  actionText: string;
  action: () => void;
};

export interface ModalContextProps {
  modalData: ModalData;
  setModalData: React.Dispatch<React.SetStateAction<ModalData>>;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ModalContext = createContext<ModalContextProps>({
  modalData: {
    title: '',
    text: '',
    actionText: '',
    action: () => {},
  },
  setModalData: () => {},
  showModal: false,
  setShowModal: () => {},
});

/* Modal Provider */

interface ModalProviderProps {
  children: ReactNode;
};

export default function ModalProvider ({ children }: ModalProviderProps) {

  const [modalData, setModalData] = useState<ModalData>({
    title: '',
    text: '',
    actionText: '',
    action: () => {},
  });
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    const localModalData: ModalData = {
      title: 'The Lending Cycle',
      text: `
      <div class="paragraph">
        <div class="title-wrapper"><span class="title-badge">Step 1</span><span class="title">Add an Item</span></div>
        <p>Click a photo or upload an image of the item you want to lend. Give it a lending value in credits. As a thank you for adding a new item, we'll top up your account with 100 credits!</p>
      </div>
      <div class="paragraph">
        <div class="title-wrapper"><span class="title-badge">Step 2</span><span class="title">Discover and Reserve</span></div>
        <p>Explore items on our discover page or use the search bar to find something specific. Once you've found something you need, reserve it. You'll be directed to a chat with the owner to arrange the pickup.</p>
      </div>
      <div class="paragraph">
        <div class="title-wrapper"><span class="title-badge">Step 3</span><span class="title">Receive and Transfer</span></div>
        <p>Meet the owner, get your item, and confirm receipt in the app. This will trigger the transfer of the agreed credits to the owner's account.</p>
      </div>
      <div class="paragraph">
        <div class="title-wrapper"><span class="title-badge">Step 4</span><span class="title">Return and Wrap Up</span></div>
        <p>When it's time to return the item, chat with the owner to arrange the meetup. Once the item is back with the owner and they confirm it in the app, the lending cycle concludes, and the item becomes available for lending again.</p>
      </div>
      <div class="paragraph">
        <div class="title-wrapper"><span class="title-badge">Step 5</span><span class="title">Be nice!</span></div>
        <p>Remember, our platform thrives on trust and community. Please respect the items and the people you interact with. Happy sharing!</p>
      </div>
    `,
      actionText: 'Got it!',
      action: () => {
        putUser({
          newUser: false,
        }
        )
        setShowModal(false) 

      }
    };
    setModalData(localModalData);
  }, [setShowModal]);

  const values: ModalContextProps = {
    modalData,
    setModalData,
    showModal,
    setShowModal
  };

  return (
    <ModalContext.Provider value={values}>
      {children}
    </ModalContext.Provider>
  );
};