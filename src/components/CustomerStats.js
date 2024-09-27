import React from 'react';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';

const CustomerStats = () => {
  const customers = useSelector((state) => state.customers);

  const totalCustomers = customers.length;

  // Function to calculate top 5 cities
  const getTopCities = () => {
    const cityCount = customers.reduce((acc, customer) => {
      acc[customer.city] = (acc[customer.city] || 0) + 1;
      return acc;
    }, {});
    
    return Object.entries(cityCount)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5);
  };

  // Function to calculate percentage of customers by city
  const getCityPercentage = () => {
    const cityCount = customers.reduce((acc, customer) => {
      acc[customer.city] = (acc[customer.city] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(cityCount).map(([city, count]) => ({
      city,
      percentage: ((count / totalCustomers) * 100).toFixed(2),
    }));
  };

  // Function to get most common first names
  const getCommonFirstNames = () => {
    const nameCount = customers.reduce((acc, customer) => {
      acc[customer.firstName] = (acc[customer.firstName] || 0) + 1;
      return acc;
    }, {});
    
    return Object.entries(nameCount)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5);
  };

  // Function to calculate email domain distribution
  const getEmailDomains = () => {
    const domainCount = customers.reduce((acc, customer) => {
      const domain = customer.email.split('@')[1];
      acc[domain] = (acc[domain] || 0) + 1;
      return acc;
    }, {});
    
    return Object.entries(domainCount).map(([domain, count]) => ({
      domain,
      percentage: ((count / totalCustomers) * 100).toFixed(2),
    }));
  };

  // Function to get recent customer additions
  const getRecentCustomers = () => {
    const thirtyDaysAgo = dayjs().subtract(30, 'day');
    return customers.filter((customer) => dayjs(customer.addedDate).isAfter(thirtyDaysAgo));
  };

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-6">Customer Statistics</h1>
      <div className="mb-4">Total Customers: {totalCustomers}</div>

      <div className="mb-4">
        <h2 className="text-2xl font-semibold">Top 5 Cities</h2>
        <ul>
          {getTopCities().map(([city, count]) => (
            <li key={city}>{city}: {count}</li>
          ))}
        </ul>
      </div>

      <div className="mb-4">
        <h2 className="text-2xl font-semibold">Percentage of Customers by City</h2>
        <ul>
          {getCityPercentage().map(({ city, percentage }) => (
            <li key={city}>{city}: {percentage}%</li>
          ))}
        </ul>
      </div>

      <div className="mb-4">
        <h2 className="text-2xl font-semibold">Most Common First Names</h2>
        <ul>
          {getCommonFirstNames().map(([name, count]) => (
            <li key={name}>{name}: {count}</li>
          ))}
        </ul>
      </div>

      <div className="mb-4">
        <h2 className="text-2xl font-semibold">Email Domain Distribution</h2>
        <ul>
          {getEmailDomains().map(({ domain, percentage }) => (
            <li key={domain}>{domain}: {percentage}%</li>
          ))}
        </ul>
      </div>

      <div className="mb-4">
        <h2 className="text-2xl font-semibold">Recent Customer Additions</h2>
        <ul>
          {getRecentCustomers().length > 0 ? (
            getRecentCustomers().map((customer) => (
              <li key={customer.id}>{customer.firstName} {customer.lastName} - {customer.email}</li>
            ))
          ) : (
            <li>No recent customers added in the last 30 days.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default CustomerStats;
