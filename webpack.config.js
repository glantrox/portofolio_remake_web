// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');

const isProduction = process.env.NODE_ENV == 'production';


const config = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js', // specify the output bundle file name
        path: path.resolve(__dirname, 'src'),
    },
    devServer: {
        open: true,
        host: 'localhost',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html',
        }),

        // Add your plugins here
        // Learn more about plugins from https://webpack.js.org/configuration/plugins/
    ],
    module: {
        rules: [
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset',
            },

            // Add your rules for custom modules here
            // Learn more about loaders from https://webpack.js.org/loaders/
        ],
    },
};

module.exports = () => {
    if (isProduction) {
        config.mode = 'production';
        
        
        config.plugins.push(new WorkboxWebpackPlugin.GenerateSW());
        
    } else {
        config.mode = 'development';
    }
    return config;
};

module.exports = [

    {
        // Client-side bundle configuration
        entry: './src/presentation/interface/dashboard_screen/dashboard.js',
        output: {
            path: path.resolve(__dirname, 'public/js'), // Output directory for client-side JavaScript files
            filename: 'dashboard.bundle.js',
        },
        // Add any additional client-side specific configurations here
        // For example, loaders for CSS, images, etc.
        module: {
            rules: [
                // Example rule for processing CSS with style-loader and css-loader
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader'],
                },
            ],
        },
    },
    {
        // Server-side bundle configuration
        target: 'node', // This tells webpack to compile for usage in a Node.js-like environment
        entry: './src/data/remote_data_source.js',
        output: {
            path: path.resolve(__dirname, 'dist'), // Output directory for server-side JavaScript files
            filename: 'remote_data_source.bundle.js',
            libraryTarget: 'commonjs2', // This is important to ensure compatibility with Node.js module system
        },
        // Add any additional server-side specific configurations here
        // For example, excluding node_modules from being processed
        externals: [/node_modules/],
    },

];
