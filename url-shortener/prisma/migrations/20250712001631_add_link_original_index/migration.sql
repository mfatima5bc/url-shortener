-- Create a conditional index on the "originalLink" column in the "links" table
CREATE UNIQUE INDEX "unique_active_original_link" ON "links"("originalLink")
WHERE
  "active" = true;