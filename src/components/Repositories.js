import React from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Icon,
} from "semantic-ui-react";
export function Repositories(data) {
  return (
    data.length > 0 && (
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              {/* {Object.keys(data[0]).map((key) => (
                <TableHeaderCell>{key}</TableHeaderCell>
              ))} */}
              <TableHeaderCell>Name</TableHeaderCell>
              <TableHeaderCell>Description</TableHeaderCell>
              <TableHeaderCell>URL</TableHeaderCell>
              <TableHeaderCell>Fork</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((repo) => (
              <TableRow key={repo.id}>
                <TableCell>{repo.name}</TableCell>
                <TableCell>{repo.description}</TableCell>
                <TableCell>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {repo.html_url}
                  </a>
                </TableCell>
                <TableCell>{repo.fork && <Icon name="fork" />}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  );
}
