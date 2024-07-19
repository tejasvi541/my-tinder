"use server";

import { driver } from "@/db/index";
import { Neo4jUser } from "@/types";

export const getUserById = async (id: string) => {
  const result = await driver.executeQuery(
    `MATCH (user:User {applicationId: $applicationId}) RETURN user`,
    { applicationId: id }
  );
  const users = result.records.map((record) => record.get("user").properties);
  if (users.length === 0) {
    return null;
  }
  return users[0] as Neo4jUser;
};

export const createUser = async (user: Neo4jUser) => {
  await driver.executeQuery(
    `CREATE (user:User {applicationId: $applicationId, first_name: $first_name, last_name: $last_name, email: $email})`,
    user
  );
  console.log("User created");
};

export const getUsersWithNoConnections = async (id: string) => {
  const result = await driver.executeQuery(
    `MATCH (cu:User {applicationId: $applicationId}) MATCH (ou:User) WHERE NOT (cu)-[:LIKE|:DISLIKE]->(ou) AND cu<>ou RETURN ou`,
    { applicationId: id }
  );
  const users = result.records.map((record) => record.get("ou").properties);
  return users as Neo4jUser[];
};

export const neo4jSwipe = async (id: string, swipe: string, userId: string) => {
  const type = swipe === "left" ? "DISLIKE" : "LIKE";

  await driver.executeQuery(
    `MATCH (cu: User {applicationId: $applicationId}), (ou: User {applicationId: $userId}) CREATE (cu)-[:${type}]->(ou)`,
    {
      applicationId: id,
      userId,
    }
  );

  if (type === "LIKE") {
    const result = await driver.executeQuery(
      `MATCH (cu: User {applicationId: $applicationId}), (ou: User {applicationId: $userId}) WHERE (ou)-[:LIKE]->(cu) RETURN ou as match`,
      {
        applicationId: id,
        userId,
      }
    );

    const matches = result.records.map(
      (record) => record.get("match").properties
    );

    return Boolean(matches.length);
  }
};
