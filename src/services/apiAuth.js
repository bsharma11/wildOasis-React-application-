import supabase, { supabaseUrl } from "./supabase";

export async function Login({ email, password }) {
  const { data: user, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return user;
}

export async function getcurrentUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const { data: user, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return user?.user;
}

export async function Logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export async function Signup({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function updateCurrentUser({ password, fullName, avatar }) {
  // 1.update password or FullName
  // Note that both password and fullname wont be updated at the same time because we have seperate form for both of em

  let updateData;

  if (password) updateData = { password };

  if (fullName) updateData = { data: { fullName } };

  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) throw new Error(error.message);
  if (!avatar) return data;

  //2. Upload the avatar image
  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (storageError) throw new Error(storageError.message);

  //3.Update avatar in the user
  const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
    },
  });

  if (error2) throw new Error(error2.message);
  return updatedUser;
}
