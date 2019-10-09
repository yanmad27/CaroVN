const createDefaultBoard = () => {
    const defaultBoardData = [];
    for (let i = 0; i < 30; i += 1) {
        const tem = [];
        for (let j = 0; j < 30; j += 1) {
            tem.push(' ');
        }
        defaultBoardData.push(tem);
    }
    return defaultBoardData;
};

export default createDefaultBoard;