CREATE OR REPLACE VIEW catalog AS
SELECT
  id,
  (SELECT name FROM manufactorers WHERE id = s.manufactorer_id) AS manufactorer,
  (SELECT name FROM levels WHERE id = s.level_id) AS level,
  name AS model,
  (SELECT COUNT(1) FROM switches_ports WHERE id = switch_id AND port_id = 1) AS "10Gigabit Ethernet",
  (SELECT COUNT(1) FROM switches_ports WHERE id = switch_id AND port_id = 2) AS "Gigabit Ethernet",
  (SELECT COUNT(1) FROM switches_ports WHERE id = switch_id AND port_id = 3) AS "Fast Ethernet",
  (SELECT COUNT(1) FROM switches_ports WHERE id = switch_id AND port_id = 4) AS "SFP",
  (SELECT COUNT(1) FROM switches_ports WHERE id = switch_id AND port_id = 5) AS "SFP+",
  (SELECT COUNT(1) FROM switches_ports WHERE id = switch_id AND port_id = 6) AS "комбинированный",
  (SELECT COUNT(1) FROM switches_ports WHERE id = switch_id AND port_id = 7) AS "USB",
  (SELECT COUNT(1) FROM switches_ports WHERE id = switch_id AND port_id = 8) AS "microUSB",
  (SELECT COUNT(1) FROM switches_ports WHERE id = switch_id AND port_id = 9) AS "RS-232",
  (SELECT COUNT(1) FROM switches_ports WHERE id = switch_id AND port_id = 10) AS "UART",
  (SELECT COUNT(1) FROM switches_ports WHERE id = switch_id AND port_id = 11) AS "последовательный порт консоли RJ-45",
  (SELECT COUNT(1) FROM switches_ports WHERE id = switch_id AND port_id = 12) AS "порт RJ-45 для внешнего управления",
  (SELECT COUNT(1) FROM switches_ports WHERE id = switch_id AND port_id = 13) AS "слот модуля стекирования",
  costs,
  input_volts,
  info
FROM switches s;
GRANT ALL PRIVILEGES ON TABLE catalog TO hero;
