"use client";
import * as React from "react";
import { Neo4jUser } from "@/types";
import TinderCard from "react-tinder-card";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface HomepageClientComponentProps {
  currentUser: Neo4jUser;
  users: Neo4jUser[];
}

const HomepageClientComponent: React.FC<HomepageClientComponentProps> = ({
  currentUser,
  users,
}: HomepageClientComponentProps) => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div>
        <div>
          <h1 className="text-4xl">
            {currentUser.first_name} {currentUser.last_name}
          </h1>
        </div>
        <div>
          {users.map((user) => (
            <TinderCard key={user.applicationId}>
              <Card>
                <CardHeader>
                  <CardTitle>
                    {user.first_name} {user.last_name}
                  </CardTitle>
                  <CardDescription>[user.email]</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Card Content</p>
                </CardContent>
                <CardFooter>
                  <p>Card Footer</p>
                </CardFooter>
              </Card>
            </TinderCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomepageClientComponent;
