'use client'
import React from "react";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import CardItem from "../card-item";
import AddCardButton from "../add-card-button";
import styles from "./styles.module.scss";
import { useBoardStore } from "../../stores/board.store";

interface CardListProps {
    columnId: string;
}

const CardList: React.FC<CardListProps> = ({ columnId }) => {

    const cards = useBoardStore((state) => state.cards)
        .filter(card => card.columnId === columnId)
        .sort((a, b) => a.order - b.order);

    return (
        <SortableContext items={cards.map(card => card.id)} strategy={verticalListSortingStrategy}>
            <div className={styles.cardList}>
                <div className={styles.cardsContainer}>
                    {cards.map((card) => (
                        <CardItem key={card.id} card={card} />
                    ))}
                </div>
                <AddCardButton columnId={columnId} cardCount={cards.length} />
            </div>
        </SortableContext>
    );
};

export default CardList;
