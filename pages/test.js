export default function Test() {
  let a = <div className=''>haha</div>;
  let b = <div>heihei</div>;
  a = [
    { value: 'a' },
    { value: 'b', bold: true },
    { value: 'c', className: 'red' },
    { value: 'd' },
  ];
  b = [
    { value: 'd' },
    { value: 'b', bold: true },
    { value: 'c', className: 'blue' },
    { value: 'd' },
  ];
  let c = [a, b];
  return (
    <table>
      <tbody>
        {c.map((item, cnt) => (
          <tr key={cnt}>
            {item.map((item2, cnt2) => (
              <td key={cnt2} className={item2.className}>
                {item2.bold?<b>{item2.value}</b>:item2.value}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
