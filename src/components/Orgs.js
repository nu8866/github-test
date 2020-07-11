import React from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
} from "semantic-ui-react";
export function Orgs(data) {
  return (
    data.length > 0 && (
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              {/* {Object.keys(data[0]).map((key) => (
                <TableHeaderCell>{key}</TableHeaderCell>
              ))} */}
              <TableHeaderCell>Login</TableHeaderCell>
              <TableHeaderCell>Description</TableHeaderCell>
              <TableHeaderCell>URL</TableHeaderCell>
              <TableHeaderCell>Icon</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((org) => (
              <TableRow key={org.id}>
                <TableCell>{org.login}</TableCell>
                <TableCell>{org.description}</TableCell>
                <TableCell>
                  <a href={org.url} target="_blank" rel="noopener noreferrer">
                    {org.url}
                  </a>
                </TableCell>
                <TableCell>
                  <img src={org.avatar_url} alt="Organization Icon" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  );
}
