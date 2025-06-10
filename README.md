# 📋 Task Backlog System

Um sistema moderno de gerenciamento de tarefas em formato Kanban, desenvolvido com **Spring Boot** (backend) e **React** (frontend), apresentando uma interface dark mode elegante com drag-and-drop.

## ✨ Funcionalidades

- 🎯 **Interface Kanban** com três colunas: Pendentes, Em Andamento, Concluídas
- 🖱️ **Drag & Drop** intuitivo para mover tarefas entre colunas
- ➕ **CRUD Completo** - Criar, visualizar, editar e excluir tarefas
- 📊 **Dashboard de Estatísticas** em tempo real
- 🌙 **Dark Mode** moderno e elegante
- 🎨 **Ícones SVG** profissionais
- 📱 **Design Responsivo** para desktop e mobile
- ⚡ **API RESTful** robusta com Spring Boot
- 💾 **Persistência** com banco H2 em memória

## 🚀 Tecnologias Utilizadas

### Backend
- **Java 21**
- **Spring Boot 3.5.0**
- **Spring Data JPA**
- **H2 Database** (em memória)
- **Lombok**
- **Maven**

### Frontend
- **React 19.1.0**
- **@dnd-kit** (drag-and-drop)
- **Axios** (requisições HTTP)
- **CSS3** moderno com flexbox e grid
- **SVG Icons** customizados

## 📋 Pré-requisitos

Antes de executar o projeto, certifique-se de ter instalado:

- **Java 21** ou superior
- **Node.js 18** ou superior
- **npm** ou **yarn**
- **Maven** (ou use o wrapper incluído)

## 🛠️ Instalação e Execução

### 1️⃣ Clone o Repositório

```bash
git clone <url-do-repositorio>
cd "Besco - Spring + React"
```

### 2️⃣ Configuração do Backend (Spring Boot)

```bash
# Entre na pasta do backend
cd backend

# Execute a aplicação Spring Boot
./mvnw spring-boot:run

# OU usando Maven instalado globalmente
mvn spring-boot:run

# OU compile e execute o JAR
./mvnw clean package
java -jar target/task-backlog-0.0.1-SNAPSHOT.jar
```

O backend estará rodando em: **http://localhost:8080**

#### 🗄️ Acesso ao Banco H2

Para visualizar o banco de dados H2:
- URL: http://localhost:8080/h2-console
- JDBC URL: `jdbc:h2:mem:testdb`
- Username: `sa`
- Password: *(deixe em branco)*

### 3️⃣ Configuração do Frontend (React)

**Em um novo terminal:**

```bash
# Entre na pasta do frontend
cd frontend

# Instale as dependências
npm install

# Inicie a aplicação React
npm start
```

O frontend estará rodando em: **http://localhost:3000**

## 🎯 Como Usar

1. **Acesse a aplicação** em http://localhost:3000
2. **Visualize as tarefas** organizadas em três colunas
3. **Crie nova tarefa** clicando no botão "Nova Tarefa"
4. **Mova tarefas** arrastando entre as colunas
5. **Delete tarefas** clicando no ícone da lixeira
6. **Monitore estatísticas** no painel superior

## 📚 API Endpoints

### Tarefas
- `GET /api/tasks` - Lista todas as tarefas
- `GET /api/tasks/{id}` - Busca tarefa por ID
- `GET /api/tasks/status/{status}` - Filtra por status
- `POST /api/tasks` - Cria nova tarefa
- `PUT /api/tasks/{id}` - Atualiza tarefa
- `DELETE /api/tasks/{id}` - Remove tarefa

### Estatísticas
- `GET /api/tasks/stats` - Estatísticas gerais
- `GET /api/tasks/pending` - Tarefas pendentes
- `GET /api/tasks/in-progress` - Tarefas em progresso
- `GET /api/tasks/completed` - Tarefas concluídas

## 📁 Estrutura do Projeto

```
Besco - Spring + React/
├── backend/                    # Aplicação Spring Boot
│   ├── src/main/java/
│   │   └── com/example/taskbacklog/
│   │       ├── controller/     # Controllers REST
│   │       ├── service/        # Lógica de negócio
│   │       ├── repository/     # Repositórios JPA
│   │       ├── entity/         # Entidades JPA
│   │       ├── dto/           # Data Transfer Objects
│   │       └── enums/         # Enumerações
│   ├── src/main/resources/
│   │   ├── application.yml    # Configurações
│   │   └── data.sql          # Dados iniciais
│   └── pom.xml               # Dependências Maven
│
├── frontend/                  # Aplicação React
│   ├── src/
│   │   ├── components/       # Componentes React
│   │   ├── services/         # Serviços API
│   │   └── App.js           # Componente principal
│   ├── public/              # Arquivos públicos
│   └── package.json         # Dependências NPM
│
└── README.md               # Este arquivo
```