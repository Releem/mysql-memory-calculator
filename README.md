# MySQL Memory Calculator by Releem

## Overview

The MySQL Memory Calculator is an open-source tool built to help DBAs and developers optimize MySQL and MariaDB server performance. This intuitive calculator estimates the **maximum memory usage** of your MySQL/MariaDB instance based on key configuration settings.

## Features

- **Real-Time Calculations**: Instantly calculate total memory usage as you input or modify values.
- **Key Variables Supported**:
  - [max_connections](https://releem.com/docs/mysql-performance-tuning/max_connections)
  - [innodb_buffer_pool_size](https://releem.com/docs/mysql-performance-tuning/innodb_buffer_pool_size)
  - [innodb_log_buffer_size](https://releem.com/docs/mysql-performance-tuning/innodb_log_buffer_size)
  - [key_buffer_size](https://releem.com/docs/mysql-performance-tuning/key_buffer_size)
  - [sort_buffer_size](https://releem.com/docs/mysql-performance-tuning/sort_buffer_size)
  - [join_buffer_size](https://releem.com/docs/mysql-performance-tuning/join_buffer_size)
  - [query_cache_size](https://releem.com/docs/mysql-performance-tuning/query_cache_size)
  - read_buffer_size
  - [read_rnd_buffer_size](https://releem.com/docs/mysql-performance-tuning/read_rnd_buffer_size)
  - [tmp_table_size](https://releem.com/docs/mysql-performance-tuning/tmp_table_size)
- **Visual Memory Distribution**: View memory allocation via interactive charts.
- **User-Friendly Design**: Mobile-responsive interface with tooltips for better understanding.

## Live Demo

Try the live version of the calculator here:  
👉 [MySQL Memory Calculator](https://releem.com/tools/mysql-memory-calculator)

## Usage

1. Enter the MySQL configuration parameters relevant to your setup.
2. View real-time memory usage calculations and distribution charts.


## Installation

To run the project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/releem/mysql-memory-calculator.git
   ```
2. Navigate to the project directory:
   ```bash
   cd mysql-memory-calculator
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm start
   ```

The app will be accessible at `http://localhost:3000` in your browser.

## Usage

1. Enter the MySQL configuration parameters relevant to your setup.
2. View real-time memory usage calculations and distribution charts.

## Technologies Used

- **Frontend**: React.js
- **Styling**: TailwindCSS
- **Charts**: Chart.js

## Contributing

We welcome contributions to improve this tool!  
To contribute, please fork the repository, create a feature branch, and submit a pull request.

## License

This project is licensed under the GPL-3.0 License. See the [LICENSE](LICENSE) file for details.

## Support

For any issues or feature requests, feel free to open an issue on the GitHub repository or contact us at [support@releem.com](mailto:support@releem.com).

## Learn More

Visit [Releem](https://releem.com) for additional tools and resources to optimize your MySQL performance.