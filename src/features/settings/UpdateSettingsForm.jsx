import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSettings } from "./useSettings";
import { useUpdateSetting } from "./useUpdateSetting";
import Spinner from "../../ui/Spinner";

function UpdateSettingsForm() {
  const {
    isLoading,
    settings: {
      minBookinglength,
      maxBookinglength,
      maxGuestsPerbooking,
      breakfastPrice,
    } = {}, // we set settings as an empty object intially because while the data is being fetched it wont show an error that minBookinglength, maxbookinglength and so on doesn't exist
  } = useSettings();

  const { isUpdating, updateSetting } = useUpdateSetting();

  function handleupdate(e, field) {
    const { value } = e.target;

    if (!value) return;

    updateSetting({ [field]: value });
  }

  if (isLoading) return <Spinner />;
  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          defaultValue={minBookinglength}
          onBlur={(e) => handleupdate(e, "minBookinglength")}
          disabled={isUpdating}
        />
      </FormRow>

      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          defaultValue={maxBookinglength}
          onBlur={(e) => handleupdate(e, "maxBookinglength")}
          disabled={isUpdating}
        />
      </FormRow>

      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          defaultValue={maxGuestsPerbooking}
          onBlur={(e) => handleupdate(e, "maxGuestsPerbooking")}
          disabled={isUpdating}
        />
      </FormRow>

      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={breakfastPrice}
          onBlur={(e) => handleupdate(e, "breakfastPrice")}
          disabled={isUpdating}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
