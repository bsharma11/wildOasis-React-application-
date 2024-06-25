import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Couldn't load cabins");
  }
  return data;
}

export async function deleteCabins(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Couldn't load cabins");
  }
  return data;
}

export async function createEditCabin(newCabin, id) {
  // console.log(newCabin, id);
  const hasimagePath = newCabin.image?.startsWith?.(supabaseUrl); // while editing if we dont update the image then the image will
  // will be a url path like we use to store it, else it will be a file which is our newly added image.

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  // we have used replaceAll to replace all / so that is the image name is eg.cabin001/2.jpg then there will be a folder created seperately i.e. cabin001 then the image with 2.jpg will be in there.

  const imagePath = hasimagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabins/${imageName}`;

  //create/edit cabin
  let query = supabase.from("cabins");

  //1. (A)Create Cabin
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  //.select().single() will return the single object and not the array of an object

  //1.(B)Edit

  console.log(newCabin, id);
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select();
  // console.log(data);

  if (error) {
    console.error(error);
    throw new Error("Couldn't load cabins");
  }

  //2.Upload image
  if (hasimagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("cabins")
    .upload(imageName, newCabin.image);

  //3.Delete the cabin if there was an error uploading the image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not created."
    );
  }
  return data;
}
