const GameStatus = ({ currentPlayer, gameStatus }) => {
    let statusClass = 'bg-neutral-5';
    if (gameStatus === 'Check') statusClass = 'bg-yellow-500';
    else if (gameStatus === 'Checkmate') statusClass = 'bg-red-500';
    else if (gameStatus === 'Draw' || gameStatus === 'Stalemate') statusClass = 'bg-blue-500';

    return (
        <Card className={`game-status ${statusClass} text-fg contrast p-2 rounded-lg shadow-lg`}>
            <h2 className="text-xl font-bold">{gameStatus}</h2>
            <p>Current Player: {currentPlayer === 'w' ? 'White' : 'Black'}</p>
        </Card>
    );
};
export default GameStatus;
