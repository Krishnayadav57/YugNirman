import { createClient } from "@/utils/supabase/server";
import NavbarClient from "@/components/NavbarClient";

export default async function Navbar() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return <NavbarClient user={user} />;
}
