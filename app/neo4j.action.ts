"use server";

import { driver } from "@/db/index";
import { Neo4jUser } from "@/types";

export const getUserById = async (id: string) => {
  const session = driver.session();
  const result = await session.run(
    `MATCH (user:User {applicationId: $applicationId}) RETURN user`,
    { applicationId: id }
  );
  session.close();
  const users = result.records.map((record) => record.get("user").properties);
  if (users.length === 0) {
    return null;
  }
  return users[0] as Neo4jUser;
};

export const createUser = async (user: Neo4jUser) => {
  const session = driver.session();
  await session.run(
    `CREATE (user:User {applicationId: $applicationId, first_name: $first_name, last_name: $last_name, email: $email})`,
    user
  );
  session.close();
};
