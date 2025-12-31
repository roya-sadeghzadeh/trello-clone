'use client'
import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import type { Column } from "../../types/column.types";
import styles from "./styles.module.scss";
import CardList from "../card-list";
import { EditableText } from "@/shared/components/editable-text/EditableText";
import { useBoardStore } from "../../stores/board.store";
import ColumnMenu from "../column-menu";

interface ColumnItemProps {
    column: Column;
}

const ColumnItem: React.FC<ColumnItemProps> = ({ column }) => {
    const updateColumn = useBoardStore((state) => state.updateColumn);

    const {
        attributes,
        listeners,
        setNodeRef: setSortableRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: column.id });

    const { setNodeRef: setDroppableRef } = useDroppable({
        id: column.id,
    });

    const setNodeRef = (node: HTMLElement | null) => {
        setSortableRef(node);
        setDroppableRef(node);
    };

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.3 : 1,
    };

    const handleSaveColumnTitle = (newTitle: string) => {
        updateColumn(column.id, { title: newTitle });
    }

    return (
        <div ref={setNodeRef} style={style} className={styles.columnItem}>
            <div className={styles.header} {...attributes} {...listeners}>
                <EditableText
                    as="h2"
                    inputClassName={styles.columnName}
                    className={styles.columnName}
                    value={column.title}
                    onSave={handleSaveColumnTitle}
                />
                <ColumnMenu columnId={column.id} />
            </div>
            <div className={styles.columnsContainer}>
                <CardList columnId={column.id} />
            </div>
        </div>
    );
}

export default ColumnItem;
