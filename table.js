export function table(columns, rows) {
    // Calculate the maximum width for each column
    const columnWidths = columns.map((column, index) => {
        const maxWidth = Math.max(...rows.map(row => String(row[index]).length));
        return Math.max(maxWidth, String(column).length);
    });

    // Function to generate horizontal line
    const generateHorizontalLine = () => {
        let line = '+';
        for (const width of columnWidths) {
            line += '-'.repeat(width + 2) + '+';
        }
        return line + '\n';
    };

    // Generate the table header
    let table = generateHorizontalLine();
    let headerRow = '|';
    columns.forEach((column, index) => {
        const padding = columnWidths[index] - String(column).length;
        headerRow += ` ${column}${' '.repeat(padding)} |`;
    });
    table += headerRow + '\n';
    table += generateHorizontalLine();

    // Generate the table rows
    rows.forEach(row => {
        let rowText = '|';
        row.forEach((cell, index) => {
            const padding = columnWidths[index] - String(cell).length;
            rowText += ` ${cell}${' '.repeat(padding)} |`;
        });
        table += rowText + '\n';
    });

    // Generate the bottom horizontal line
    table += generateHorizontalLine();
    
    return table;
}
