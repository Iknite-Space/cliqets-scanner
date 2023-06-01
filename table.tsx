import {Text} from 'native-base';
import React from 'react';

export default function Table({theadData, tbodyData}: any) {
  return (
    <Text>
      <table>
        <thead>
          <tr>
            {theadData.map((heading: any) => {
              return <th key={heading}>{heading}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {tbodyData.map((row: any, index: any) => {
            return (
              <tr key={index}>
                {theadData.map((key: any, index: any) => {
                  return <td key={row[key]}>{row[key]}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </Text>
  );
}
