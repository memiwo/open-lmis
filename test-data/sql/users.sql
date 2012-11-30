INSERT INTO roles
 (id, name, description) VALUES
 (1, 'store in-charge', ''),
 (2, 'district pharmacist', '');

INSERT INTO role_rights
  (role_id, right_id) VALUES
  (1, 1),
  (1, 2),
  (2, 1),
  (2, 3);

INSERT INTO users
  (id, user_name, password, role, facility_id) VALUES
  (1, 'Admin123', 'TQskzK3iLfbRVHeM1muvBCiKribfl6lh8+o91hb74G3OvsybvkzpPI4S3KIeWTXAiwlUU0iSxWi4wSuS8mokSA==','ADMIN', null),
  (2, 'User123', 'Ag/myf1Whs0fxr1FFfK8cs3q/VJ1qMs3yuMLDTeEcZEGzstj/waaUsQNQTIKk1U5JRzrDbPLCzCO1/vB5YGaEQ==','USER', 1);

INSERT INTO role_assignments
  (user_id, role_id, program_id) VALUES
  (1, 1, 'HIV'),
  (2, 2, 'HIV');