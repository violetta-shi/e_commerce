import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import AreaChart from "./AreaChart";
import LineChart from "./LineChart";
import DataTable from "./DataTable";
import MainContainer from "../../util/MainContainer";
import FunnelChart from "./FunnelChart";

export default function WebDashboard() {
  const sessionData = [
    { Year: "2024",  Mobile: "40.35%", Desktop: "59.65%" },
    { Quarter: "Q4", Mobile: "40.35%", Desktop: "16.01%" },
  ];

  const conversionData = [
    { Year: "2024", "Mobile CR": "1.92%", "CR Realised": "1.45%" },
    { Quarter: "Q4", "Mobile CR": "1.92%", "CR Realised": "1.45%" },
  ];

  return (
    <MainContainer> 
    <Container fluid>
      <h2 className="text-center text-primary my-4">Веб-разработка</h2>
      <Row>
        <Col md={6}>
          <h4 className="text-center ">Сессии</h4>
          <AreaChart />
          <DataTable title="Процентное соотношение среди платформ" data={sessionData} />
        </Col>
        <Col md={6}>
          <h4 className="text-center">Конверсия заказов</h4>
          <LineChart />
          <DataTable title="Средний CR / CR Realised" data={conversionData} />
        </Col>
      </Row>
      <FunnelChart></FunnelChart>
    </Container>
    </MainContainer>
  );
}
