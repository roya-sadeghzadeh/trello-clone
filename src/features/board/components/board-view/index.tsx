'use client'
import React from "react";
import { useBoardStore } from "../../stores/board.store";
import ColumnList from "../column-list";
import AddColumnButton from "../add-column-button";
import CardModal from "../card-modal";
import { BoardHydration } from "../board-hydration";
import styles from "./styles.module.scss";
import { EditableText } from "@/shared/components/editable-text/EditableText";
import { useMemo } from "react";

interface BoardViewProps {
    boardId: string;
}

const BoardView: React.FC<BoardViewProps> = ({ boardId }) => {
    const columns = useBoardStore((state) => state.columns);
    const title = useBoardStore((state) => state.title);
    const updateBoardTitle = useBoardStore((state) => state.updateBoardTitle);

    // Sort columns by order property for correct rendering and drag-drop
    const sortedColumns = useMemo(() => {
        return [...columns].sort((a, b) => a.order - b.order);
    }, [columns]);

    const handleSaveBoardName = (newName: string) => {
      updateBoardTitle(newName);
    }

    return (
        <div className={styles.boardView}>
            <BoardHydration />
            <div className={styles.header}>
                <EditableText as="h1" value={title} onSave={handleSaveBoardName} className={styles.boardTitle} inputClassName={styles.boardTitleInput} />
            </div>


                    <div className={styles.content}>
                        <ColumnList columns={sortedColumns} />
                        <div>
                            <AddColumnButton columnCount={columns.length} />
                        </div>
                    </div>


            <CardModal />
        </div>
    );
}

export default BoardView;
