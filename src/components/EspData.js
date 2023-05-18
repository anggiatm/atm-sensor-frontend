const EspData = ({ data }) => {
  return (
    <>
      {data.map((curData) => {
        const {
          id,
          mac_addr,
          publish_to,
          alarm_count,
          warn_count,
          temp,
          hum,
          accel_x,
          accel_y,
          accel_z,
          accel_all,
          last_update,
        } = curData;

        return (
          <tr key={id}>
            <td>{id}</td>
            <td>{mac_addr}</td>
            <td>{publish_to}</td>
            <td>{alarm_count}</td>
            <td>{warn_count}</td>
            <td>{temp}</td>
            <td>{hum}</td>
            <td>{accel_x}</td>
            <td>{accel_y}</td>
            <td>{accel_z}</td>
            <td>{accel_all}</td>
            <td>{last_update}</td>
          </tr>
        );
      })}
    </>
  );
};

export default EspData;
