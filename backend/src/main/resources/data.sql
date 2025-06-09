-- Inserindo tarefas de exemplo
INSERT INTO tasks (title, description, status, created_at) VALUES 
('Configurar ambiente de desenvolvimento', 'Instalar e configurar todas as ferramentas necessárias', 'COMPLETED', CURRENT_TIMESTAMP),
('Criar API REST', 'Desenvolver endpoints para gerenciar tarefas', 'IN_PROGRESS', CURRENT_TIMESTAMP),
('Implementar frontend', 'Criar interface de usuário para o backlog', 'PENDING', CURRENT_TIMESTAMP),
('Escrever documentação', 'Documentar a API e como usar o sistema', 'PENDING', CURRENT_TIMESTAMP),
('Testes unitários', 'Implementar testes para os endpoints', 'PENDING', CURRENT_TIMESTAMP); 