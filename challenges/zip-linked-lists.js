/* Merge two linked lists so that their nodes alternate. Let the first node of the zipped list be
 * the first node of the first argument, if it exists.
 * Implement the linked list using only a Node class. No need for a wrapper LinkedList class
 *
 * BONUS: Do this in place
 */

function Node(val) {
  this.value = val;
  this.next = null;
}

function zip(l1, l2) {
  if (!l1 && !l2) return undefined;
  if (!l1) return l2;
  if (!l2) return l1;
  let head = l1;
  let temp = l1;
  l1 = l1.next;
  while (l1 && l2){
    temp.next = l2;
    temp = temp.next;

    l2 = l2.next;
    temp.next = l1


    temp = temp.next;
    l1 = l1.next;
  }
  temp.next = !l1 ? l2 : l1;
  return head;
}

module.exports = {Node: Node, zip: zip};
