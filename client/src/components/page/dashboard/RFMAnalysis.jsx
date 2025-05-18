import React from 'react';

// Данные для RFM анализа
const data = [
  { activity: 'Высокая активность', recency: 9, frequency: 310, monetary: 91954.24 },
  { activity: 'Средняя активность', recency: 54, frequency: 270, monetary: 55172.54 },
  { activity: 'Низкая активность', recency: 192, frequency: 199, monetary: 36781.70 },
];

const RFMTables = () => {
  return (
    <div style={styles.container}>
      <h3 style={styles.header}>RFM Анализ</h3>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Активность</th>
            <th style={styles.th}>Дней с момента последней покупки (R)</th>
            <th style={styles.th}>Количество покупок за последние 12 месяцев (F)</th>
            <th style={styles.th}>Чистый доход за последние 12 месяцев (M)</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} style={index % 2 === 0 ? styles.evenRow : styles.oddRow}>
              <td style={styles.td}>{row.activity}</td>
              <td style={styles.td}>{row.recency}</td>
              <td style={styles.td}>{row.frequency}</td>
              <td style={styles.td}>${row.monetary}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Стили для компонента
const styles = {
  container: {
    margin: '20px',
    padding: '10px',
    backgroundColor: '#f5f5f5',
    borderRadius: '10px',
    boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)',
  },
  header: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '20px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    padding: '12px',
    textAlign: 'center',
    border: '1px solid #ddd',
    backgroundColor: '#333',
    color: '#fff',
  },
  td: {
    padding: '12px',
    textAlign: 'center',
    border: '1px solid #ddd',
    fontWeight: 'bold',
  },
  evenRow: {
    backgroundColor: '#f2f2f2',
  },
  oddRow: {
    backgroundColor: '#fff',
  },
};

export default RFMTables;
