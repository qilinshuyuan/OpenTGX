export class DoubleList {
    head: DoubleListItem | null = null;
    tail: DoubleListItem | null = null;

    public get isEmpty() {
        return this.head == null;
    }

    public addToTail(data?: any): DoubleListItem {
        let item = DoubleListItem.getFromPool(data, 'dont_call_this_function_by_your_self');
        this.addItemToTail(item);
        return item;
    }

    public insertToHead(data?: any): DoubleListItem {
        let item = DoubleListItem.getFromPool(data, 'dont_call_this_function_by_your_self');
        this.insertItemToHead(item);
        return item;
    }

    private addItemToTail(item: DoubleListItem) {
        if (!item) {
            return;
        }

        if (item.isLinked) {
            throw Error('item must be unlinked.');
        }

        if (this.head == null) {
            this.head = this.tail = item;
            item.owner = this;
            item.pre = null;
            item.next = null;
            return;
        }

        if (!this.tail) {
            throw Error('tail can not be nil');
        }

        this.tail.next = item;
        item.pre = this.tail;
        this.tail = item;
        item.owner = this;
    }

    private insertItemToHead(item: DoubleListItem) {
        if (!item) {
            return;
        }

        if (item.isLinked) {
            throw Error('item must be unlinked.');
        }

        if (this.head == null) {
            this.head = this.tail = item;
            item.owner = this;
            item.pre = null;
            item.next = null;
            return;
        }

        this.head.pre = item;
        item.next = this.head;
        item.owner = this;

        this.head = item;
    }

    public forEach(cb: (v: DoubleListItem) => any) {
        if (!cb) {
            return;
        }
        let cur = this.head;
        while (cur) {
            let next = cur.next;
            let needBreak = cb(cur);
            if (needBreak) {
                return;
            }
            cur = next;
        }
    }

    clear() {
        this.forEach(v => {
            v.dispose();
        });
    }
}

export class DoubleListItem {
    public owner: DoubleList | null = null;
    public pre: DoubleListItem | null = null;
    public next: DoubleListItem | null = null;
    public data: any | null = null;

    private static _itemPool: DoubleList = new DoubleList();
    public static getFromPool(data: any | undefined, args: 'dont_call_this_function_by_your_self'): DoubleListItem {
        let item = this._itemPool.tail;
        if (item) {
            item.removeSelf();
            item.data = data;
            return item;
        }
        return new DoubleListItem(data, 'dont_call_this_function_by_your_self');
    }

    public static putBackToPool(item: DoubleListItem, args: 'dont_call_this_function_by_your_self') {
        item.removeSelf();
        (this._itemPool as any).addItemToTail(item);
    }

    constructor(data: any | undefined, args: 'dont_call_this_function_by_your_self') {
        this.data = data;
    }

    get isLinked() {
        return this.owner != null;
    }

    public dispose() {
        DoubleListItem.putBackToPool(this, 'dont_call_this_function_by_your_self');
    }

    private removeSelf() {
        if (!this.owner) {
            return;
        }

        if (this.owner.head == this) {
            this.owner.head = this.next;
        }

        if (this.owner.tail == this) {
            this.owner.tail = this.pre;
        }

        if (this.pre) {
            this.pre.next = this.next;
        }

        if (this.next) {
            this.next.pre = this.pre;
        }

        this.owner = null;
        this.pre = null;
        this.next = null;
    }
}