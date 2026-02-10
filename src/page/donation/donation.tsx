import React from 'react';

export function Donation() {
  return (
    <section className="donation-page panel">
      <h1><strong>捐赠 VirtualHotBar</strong></h1>
      <p>
        WinNew 为
        <strong> 非盈利项目</strong>
        。如果你觉得项目不错，请考虑捐赠，以维持项目持续维护。
      </p>

      <h2 style={{ marginTop: '20px' }}>捐赠途径</h2>
      <div className="donation-table-wrap">
        <table className="donation-table">
          <thead>
            <tr>
              <th>微信支付</th>
              <th>支付宝</th>
              <th>QQ支付</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><img src="https://p1.hotpe.top/i/PicGo/202302031716843.jpg" alt="微信收款码" /></td>
              <td><img src="https://p1.hotpe.top/i/PicGo/202302031715348.jpg" alt="支付宝收款码" /></td>
              <td><img src="https://p1.hotpe.top/i/PicGo/202302031715361.jpg" alt="QQ收款码" /></td>
            </tr>
          </tbody>
        </table>
      </div>
      <h3 style={{ marginTop: '16px' }}>感谢你对 WinNew 的支持</h3>
    </section>
  );
}
