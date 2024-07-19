import { createUser, getUserById } from "@/app/neo4j.action";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

const CallbackPage = async () => {
  const { isAuthenticated, getUser } = getKindeServerSession();
  if (await !isAuthenticated()) {
    return redirect(
      "/api/auth/login?post_login_redirect_url=http://localhost:3000/callback"
    );
  }

  const user = await getUser();

  if (!user) {
    return redirect(
      "/api/auth/login?post_login_redirect_url=http://localhost:3000/callback"
    );
  }
  console.log(user);

  // Check if the user is in Database
  const dbUser = await getUserById(user.id);
  console.log(dbUser);

  if (!dbUser) {
    // Create user in Database
    await createUser({
      applicationId: user.id,
      first_name: user.given_name!,
      last_name: user.family_name ?? undefined,
      email: user.email!,
    });
  }
  //

  return redirect("/");
};

export default CallbackPage;
