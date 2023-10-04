import Modal from "./Modal";
import { SubmitButton } from "./buttons";

type ProfileModalProps = {
  close: () => void;
  about: string;
};

export default function ProfileModal({ close, about }: ProfileModalProps) {
  return (
    <Modal close={close}>
      <h1>Edit profile</h1>
      <form className="py-4 flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="about">About</label>
          <textarea
            defaultValue={about}
            id="about"
            name="about"
            className="p-2 shadow bg-slate-100"
          />
        </div>
        <div>
          <SubmitButton text="Save" />
        </div>
      </form>
    </Modal>
  );
}
