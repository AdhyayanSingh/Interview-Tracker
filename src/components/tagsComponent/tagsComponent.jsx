import React from 'react'
import Topic from './tag';
import './tags.scss';

const allTopics = ['All', 'Array', 'String', 'Searching & Sorting', 'LinkedList', 'Binary Trees', 'Binary Search Trees', 'Greedy', 'BackTracking', 'Stacks & Queues', 'Heap', 'Graph', 'Trie', 'Dynamic Programming', 'Bit Manipulation'];

export default function TagsComponent() {
    return (
        <div className="tags">
            <div className="topic">
                Topics:
            </div>
            {allTopics.map((e, ind) => (
                <Topic key={ind} data={e} />
            ))}
        </div>
    )
}
