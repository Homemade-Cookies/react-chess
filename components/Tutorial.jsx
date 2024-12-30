const Tutorial = ({ onClose }) => (
    <Dialog open={true} onOpenChange={onClose}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Chess Game Tutorial</DialogTitle>
            </DialogHeader>
            <DialogDescription>
                <p>Welcome to the Chess Game!</p>
                <p>Here are the basic rules and controls:</p>
                <ul>
                    <li>Click on a piece to select it.</li>
                    <li>Possible moves will be highlighted.</li>
                    <li>Click on a highlighted square to move the piece.</li>
                    <li>The game ends in checkmate, stalemate, or draw.</li>
                    <li>Use the buttons to reset, save, or load the game.</li>
                </ul>
            </DialogDescription>
            <DialogFooter>
                <DialogClose asChild>
                    <Button variant="primary">Start Game</Button>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
    </Dialog>
);

export { Tutorial };