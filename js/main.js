// QuickPlay Games - Main JavaScript File
// Common functionality shared across all pages

// Game data definition
const allGames = [
    {
        id: 'tetris',
        name: 'Classic Tetris',
        description: 'Classic Tetris game that tests your reaction speed and spatial thinking ability',
        category: 'Puzzle',
        categoryColor: 'blue',
        imageUrl: 'assets/games/tetris/cover.svg',
        gameUrl: 'game.html?game=tetris'
    },

    {
        id: 'puzzle',
        name: 'Number Sliding Puzzle',
        description: 'Move number blocks and arrange them in order to complete the challenge',
        category: 'Puzzle',
        categoryColor: 'blue',
        imageUrl: 'assets/games/puzzle/cover.svg',
        gameUrl: 'game.html?game=puzzle'
    },
    {
            id: 'speed-racing',
            name: 'Speed Racing',
            description: 'High-speed racing game with stunning graphics',
            category: 'Racing',
            categoryColor: '#FF6B6B',
            imageUrl: 'assets/games/racing/cover.svg',
            gameUrl: 'game.html?game=speed-racing'
        },
    {
        id: 'snake',
        name: 'Classic Snake',
        description: 'Classic Nokia snake game - eat food, grow longer, and avoid hitting yourself',
        category: 'Arcade',
        categoryColor: 'green',
        imageUrl: 'assets/games/snake/cover.svg',
        gameUrl: 'game.html?game=snake'
    }
];

// 主题切换功能
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    
    // 页面加载时检查localStorage中的主题设置
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        html.classList.remove('dark');
        updateThemeIcon(false);
    } else {
        html.classList.add('dark');
        updateThemeIcon(true);
    }
    
    // 主题切换按钮点击事件
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const isDark = html.classList.contains('dark');
            
            if (isDark) {
                // 切换到浅色模式
                html.classList.remove('dark');
                localStorage.setItem('theme', 'light');
                updateThemeIcon(false);
            } else {
                // 切换到深色模式
                html.classList.add('dark');
                localStorage.setItem('theme', 'dark');
                updateThemeIcon(true);
            }
        });
    }
}

// 更新主题切换按钮图标
function updateThemeIcon(isDark) {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        const icon = themeToggle.querySelector('i');
        if (icon) {
            if (isDark) {
                // 深色模式显示月亮图标
                icon.className = 'fas fa-moon';
            } else {
                // 浅色模式显示太阳图标
                icon.className = 'fas fa-sun';
            }
        }
    }
}

// 搜索功能
function initSearch() {
    const searchInput = document.querySelector('input[type="search"], .search-input');
    const searchButton = document.querySelector('.search-button, .search-icon');
    
    // 搜索函数
    function performSearch() {
        const query = searchInput ? searchInput.value.trim() : '';
        if (query) {
            const encodedQuery = encodeURIComponent(query);
            window.location.href = `search.html?query=${encodedQuery}`;
        }
    }
    
    // 搜索框回车事件
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                performSearch();
            }
        });
    }
    
    // 搜索按钮点击事件
    if (searchButton) {
        searchButton.addEventListener('click', function(e) {
            e.preventDefault();
            performSearch();
        });
    }
}

// 获取游戏数据的辅助函数
function getGameById(gameId) {
    return allGames.find(game => game.id === gameId);
}

function getGamesByCategory(category) {
    return allGames.filter(game => game.category === category);
}

function searchGames(query) {
    const searchTerm = query.toLowerCase();
    return allGames.filter(game => 
        game.name.toLowerCase().includes(searchTerm) ||
        game.description.toLowerCase().includes(searchTerm) ||
        game.category.toLowerCase().includes(searchTerm)
    );
}

// 获取收藏游戏ID列表的辅助函数
function getFavorites() {
    return JSON.parse(localStorage.getItem('favorites') || '[]');
}

// 初始化应用程序
document.addEventListener('DOMContentLoaded', function() {
    console.log('QuickPlay Games initialized');
    
    // 初始化主题切换
    initThemeToggle();
    
    // 初始化搜索功能
    initSearch();
    
    // 将游戏数据暴露到全局作用域，供其他脚本使用
    window.allGames = allGames;
    window.getGameById = getGameById;
    window.getGamesByCategory = getGamesByCategory;
    window.searchGames = searchGames;
});