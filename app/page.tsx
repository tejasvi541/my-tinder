import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

const Home = async () => {
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

  return <div>Hi {user.given_name}</div>;
};

export default Home;
