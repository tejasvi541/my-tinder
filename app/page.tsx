import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { getUserById, getUsersWithNoConnections } from "./neo4j.action";
import HomepageClientComponent from "@/components/HomepageClientComponent";

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

  const usersWithNoConnections = await getUsersWithNoConnections(user.id);
  const currentUser = await getUserById(user.id);
  console.log(currentUser);

  return (
    <div>
      {currentUser && (
        <HomepageClientComponent
          currentUser={currentUser}
          users={usersWithNoConnections}
        />
      )}
      {/* Hi {user.given_name}
      <pre>
        <code>{JSON.stringify(usersWithNoConnections, null, 2)}</code>
      </pre> */}
    </div>
  );
};

export default Home;
