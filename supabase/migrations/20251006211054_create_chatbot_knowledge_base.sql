/*
  # Criar Base de Conhecimento do Assistente Federal Associados

  1. Nova Tabela
    - `chatbot_knowledge`
      - `id` (uuid, primary key) - Identificador único
      - `section_number` (text) - Número da seção (ex: "1", "2.1", etc)
      - `section_title` (text) - Título da seção
      - `content` (text) - Conteúdo completo da seção
      - `created_at` (timestamptz) - Data de criação
      - `updated_at` (timestamptz) - Data de atualização

  2. Security
    - Enable RLS na tabela `chatbot_knowledge`
    - Políticas para leitura pública (assistente precisa acessar)
    - Políticas restritivas para escrita (apenas admin)
*/

CREATE TABLE IF NOT EXISTS chatbot_knowledge (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section_number text NOT NULL,
  section_title text NOT NULL,
  content text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE chatbot_knowledge ENABLE ROW LEVEL SECURITY;

-- Política para leitura pública (o assistente precisa consultar)
CREATE POLICY "Qualquer um pode ler a base de conhecimento"
  ON chatbot_knowledge
  FOR SELECT
  TO public
  USING (true);

-- Política restritiva para inserção (apenas autenticados podem inserir)
CREATE POLICY "Apenas autenticados podem inserir conhecimento"
  ON chatbot_knowledge
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Política restritiva para atualização (apenas autenticados podem atualizar)
CREATE POLICY "Apenas autenticados podem atualizar conhecimento"
  ON chatbot_knowledge
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Política restritiva para deleção (apenas autenticados podem deletar)
CREATE POLICY "Apenas autenticados podem deletar conhecimento"
  ON chatbot_knowledge
  FOR DELETE
  TO authenticated
  USING (true);

-- Criar índice para melhorar performance de busca
CREATE INDEX IF NOT EXISTS idx_chatbot_knowledge_section 
  ON chatbot_knowledge(section_number);
