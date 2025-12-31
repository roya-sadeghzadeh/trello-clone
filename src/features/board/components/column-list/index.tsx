'use client'
import React from "react";
import { SortableContext, horizontalListSortingStrategy } from "@dnd-kit/sortable";
import { DndContext, DragOverlay, closestCorners, useSensor, useSensors, PointerSensor } from "@dnd-kit/core";
import ColumnItem from "../column-item";
import CardItem from "../card-item";
import type { Column } from "../../types/column.types";
import styles from "./styles.module.scss";
import { useBoardStore } from "../../stores/board.store";
import { useBoardDnd } from "../../hooks/use-board-dnd";

interface ColumnListProps {
    columns: Column[];
}

const ColumnList: React.FC<ColumnListProps> = ({ columns }) => {
    const cards = useBoardStore((state) => state.cards);
    const activeDraggingId = useBoardStore((state) => state.activeDraggingId);
    const setActiveDraggingId = useBoardStore((state) => state.setActiveDraggingId);
    const { handleDragEnd } = useBoardDnd();

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5,
            },
        })
    );

    const activeCard = activeDraggingId ? cards.find((card) => card.id === activeDraggingId) : null;
    const activeColumn = activeDraggingId ? columns.find((col) => col.id === activeDraggingId) : null;

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={(event) => setActiveDraggingId(event.active.id as string)}
            onDragEnd={(event) => {
                setActiveDraggingId(null);
                handleDragEnd(event);
            }}
            onDragCancel={() => setActiveDraggingId(null)}
        >
            <SortableContext items={columns.map(col => col.id)} strategy={horizontalListSortingStrategy}>
                <div className={styles.columnList}>
                    {columns.map((column) => (
                        <ColumnItem key={column.id} column={column} />
                    ))}
                </div>
            </SortableContext>
            <DragOverlay>
                {activeCard ? (
                    <CardItem card={activeCard} />
                ) : activeColumn ? (
                    <ColumnItem column={activeColumn} />
                ) : null}
            </DragOverlay>
        </DndContext>
    );
}

export default ColumnList;
