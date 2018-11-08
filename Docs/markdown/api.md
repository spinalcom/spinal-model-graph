<a name="SpinalContext"></a>

## SpinalContext
**Kind**: global class  

* [SpinalContext](#SpinalContext)
    * [new SpinalContext(type, name, element)](#new_SpinalContext_new)
    * [.addRelationId(relationId)](#SpinalContext+addRelationId)
    * [.removeFromGraph()](#SpinalContext+removeFromGraph)
    * [.addChild(child, relationName, relationType)](#SpinalContext+addChild)

<a name="new_SpinalContext_new"></a>

### new SpinalContext(type, name, element)

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| type | <code>String</code> | <code>SpinalContext</code> | Type of the context |
| name | <code>String</code> |  | Name of the context |
| element | <code>SpinalNode</code> \| <code>Model</code> |  | Element of the node |

<a name="SpinalContext+addRelationId"></a>

### spinalContext.addRelationId(relationId)
Add the relation id to the relation ids displayable by this context.

**Kind**: instance method of [<code>SpinalContext</code>](#SpinalContext)  

| Param | Type | Description |
| --- | --- | --- |
| relationId | <code>String</code> | Id of the rlation |

<a name="SpinalContext+removeFromGraph"></a>

### spinalContext.removeFromGraph()
Remove all the nodes associated to this context from the graph.

**Kind**: instance method of [<code>SpinalContext</code>](#SpinalContext)  
<a name="SpinalContext+addChild"></a>

### spinalContext.addChild(child, relationName, relationType)
Add Child to the context with a spinalRelationLstPtrType.

**Kind**: instance method of [<code>SpinalContext</code>](#SpinalContext)  

| Param | Type | Description |
| --- | --- | --- |
| child | <code>SpinalNode</code> \| <code>Model</code> | Node to be added as child |
| relationName | <code>String</code> | Name of the relation |
| relationType | <code>Number</code> | This parameter is here only to properly override the parent method |

<a name="SpinalGraph"></a>

## SpinalGraph
**Kind**: global class  

* [SpinalGraph](#SpinalGraph)
    * [new SpinalGraph(name, type, element)](#new_SpinalGraph_new)
    * [.addContext(context)](#SpinalGraph+addContext)
    * [.getContext(name)](#SpinalGraph+getContext) ⇒ <code>SpinalContext</code> \| <code>undefined</code>

<a name="new_SpinalGraph_new"></a>

### new SpinalGraph(name, type, element)

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| name | <code>String</code> | <code>undefined</code> | Name of the graph |
| type | <code>String</code> | <code>SpinalGraph</code> | Type of the graph |
| element | <code>SpinalNode</code> \| <code>Model</code> |  | Element of the node |

<a name="SpinalGraph+addContext"></a>

### spinalGraph.addContext(context)
Adds a context to the graph.

**Kind**: instance method of [<code>SpinalGraph</code>](#SpinalGraph)  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>SpinalContext</code> | Context to be added |

<a name="SpinalGraph+getContext"></a>

### spinalGraph.getContext(name) ⇒ <code>SpinalContext</code> \| <code>undefined</code>
Searches for a context using its name.

**Kind**: instance method of [<code>SpinalGraph</code>](#SpinalGraph)  
**Returns**: <code>SpinalContext</code> \| <code>undefined</code> - The wanted context or undefined if the context wasn't found  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | Name of the context |

<a name="SpinalNode"></a>

## SpinalNode
**Kind**: global class  

* [SpinalNode](#SpinalNode)
    * [new SpinalNode(name, type, element)](#new_SpinalNode_new)
    * [.getId()](#SpinalNode+getId) ⇒ <code>Str</code>
    * [.getElement()](#SpinalNode+getElement) ⇒ <code>Promise.&lt;\*&gt;</code>
    * [.getType()](#SpinalNode+getType) ⇒ <code>Str</code>
    * [.hasRelation(relationName, relationType)](#SpinalNode+hasRelation) ⇒ <code>Boolean</code>
    * [.hasRelations(relationNames, relationType)](#SpinalNode+hasRelations) ⇒ <code>Boolean</code>
    * [.addChild(child, relationName, relationType)](#SpinalNode+addChild)
    * [.removeChild(node, relationName, relationType)](#SpinalNode+removeChild)
    * [.removeFromGraph()](#SpinalNode+removeFromGraph)
    * [.getChildren(relationNames)](#SpinalNode+getChildren) ⇒ <code>Promise.&lt;(Array\|never\|void)&gt;</code>
    * [.getParent(relationNames)](#SpinalNode+getParent) ⇒ <code>Promise.&lt;Array&gt;</code>

<a name="new_SpinalNode_new"></a>

### new SpinalNode(name, type, element)

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| name | <code>String</code> | <code>undefined</code> | Name of the node |
| type | <code>String</code> | <code>SpinalNode</code> | Type of the node |
| element | [<code>SpinalNode</code>](#SpinalNode) \| <code>Model</code> |  | Optional element pointed by the node, by default it points to a empty new Model |

<a name="SpinalNode+getId"></a>

### spinalNode.getId() ⇒ <code>Str</code>
Shortcut to info.id.

**Kind**: instance method of [<code>SpinalNode</code>](#SpinalNode)  
<a name="SpinalNode+getElement"></a>

### spinalNode.getElement() ⇒ <code>Promise.&lt;\*&gt;</code>
Return the element.

**Kind**: instance method of [<code>SpinalNode</code>](#SpinalNode)  
**Returns**: <code>Promise.&lt;\*&gt;</code> - A promise where the parameter of the resolve method is the element  
<a name="SpinalNode+getType"></a>

### spinalNode.getType() ⇒ <code>Str</code>
Shortcut to info.type.

**Kind**: instance method of [<code>SpinalNode</code>](#SpinalNode)  
**Returns**: <code>Str</code> - type of the node.  
<a name="SpinalNode+hasRelation"></a>

### spinalNode.hasRelation(relationName, relationType) ⇒ <code>Boolean</code>
Verify if the node contains the relation name.

**Kind**: instance method of [<code>SpinalNode</code>](#SpinalNode)  
**Returns**: <code>Boolean</code> - Return true is the relation is contained in the node and false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| relationName | <code>String</code> | Name of the relation |
| relationType | <code>Number</code> | Type of the relation |

<a name="SpinalNode+hasRelations"></a>

### spinalNode.hasRelations(relationNames, relationType) ⇒ <code>Boolean</code>
Verify if the node contains all the relation names.

**Kind**: instance method of [<code>SpinalNode</code>](#SpinalNode)  
**Returns**: <code>Boolean</code> - Return true if the node contains all the relations in relationNames, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| relationNames | <code>Array</code> | Array containing all the relation name |
| relationType | <code>Number</code> | Type of the relations |

<a name="SpinalNode+addChild"></a>

### spinalNode.addChild(child, relationName, relationType)
Add the node as child of the relation.

**Kind**: instance method of [<code>SpinalNode</code>](#SpinalNode)  

| Param | Type | Description |
| --- | --- | --- |
| child | [<code>SpinalNode</code>](#SpinalNode) \| <code>Model</code> | Element to add as child |
| relationName | <code>String</code> | Name of the relation |
| relationType | <code>Number</code> | Type of the relation |

<a name="SpinalNode+removeChild"></a>

### spinalNode.removeChild(node, relationName, relationType)
Remove the node from the relation children.

**Kind**: instance method of [<code>SpinalNode</code>](#SpinalNode)  

| Param | Type | Description |
| --- | --- | --- |
| node | [<code>SpinalNode</code>](#SpinalNode) | Node to remove |
| relationName | <code>String</code> | Name of the relation to wich the node belongs |
| relationType | <code>Number</code> | Type of the relation to wich the node belongs |

<a name="SpinalNode+removeFromGraph"></a>

### spinalNode.removeFromGraph()
Remove the node from the graph i.e remove the node from all the parent relations and remove all the children relations.
This operation might delete all the sub-graph under this node.
After this operation the node can be deleted without fear.

**Kind**: instance method of [<code>SpinalNode</code>](#SpinalNode)  
<a name="SpinalNode+getChildren"></a>

### spinalNode.getChildren(relationNames) ⇒ <code>Promise.&lt;(Array\|never\|void)&gt;</code>
Return all children for the relation name no matter the type of relation

**Kind**: instance method of [<code>SpinalNode</code>](#SpinalNode)  
**Returns**: <code>Promise.&lt;(Array\|never\|void)&gt;</code> - Promise containing all children for the relation names.  

| Param | Type | Description |
| --- | --- | --- |
| relationNames | <code>Array</code> | Array containing the relation names of the desired children |

<a name="SpinalNode+getParent"></a>

### spinalNode.getParent(relationNames) ⇒ <code>Promise.&lt;Array&gt;</code>
Return all parents for the relation names no matter the type of relation

**Kind**: instance method of [<code>SpinalNode</code>](#SpinalNode)  
**Returns**: <code>Promise.&lt;Array&gt;</code> - Promise containing all parents for the relation names.  

| Param | Type | Description |
| --- | --- | --- |
| relationNames | <code>Array</code> | Array containing the relation name of the desired parents |

## Functions

<dl>
<dt><a href="#promiseLoad">promiseLoad(nodePointer)</a> ⇒ <code>Promise.&lt;*&gt;</code></dt>
<dd><p>Loads the element pointed by the pointer.</p>
</dd>
<dt><a href="#s4">s4()</a> ⇒ <code>String</code></dt>
<dd><p>Generates a random number and returns in a string.</p>
</dd>
<dt><a href="#guid">guid(name)</a> ⇒ <code>String</code></dt>
<dd><p>Creates a unique id based on a name.</p>
</dd>
</dl>

<a name="promiseLoad"></a>

## promiseLoad(nodePointer) ⇒ <code>Promise.&lt;\*&gt;</code>
Loads the element pointed by the pointer.

**Kind**: global function  
**Returns**: <code>Promise.&lt;\*&gt;</code> - Element to wich the pointer pointed  

| Param | Type | Description |
| --- | --- | --- |
| nodePointer | <code>SpinalNodePointer</code> | SpinalNodePointer to load |

<a name="s4"></a>

## s4() ⇒ <code>String</code>
Generates a random number and returns in a string.

**Kind**: global function  
**Returns**: <code>String</code> - Random number in a string  
<a name="guid"></a>

## guid(name) ⇒ <code>String</code>
Creates a unique id based on a name.

**Kind**: global function  
**Returns**: <code>String</code> - Generated id  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | Name from wich the id is generated |

<a name="SpinalNodePointer"></a>

## SpinalNodePointer
Wrapper over SpinalNodePointer containing some information about the pointed element

**Kind**: global class  

* [SpinalNodePointer](#SpinalNodePointer)
    * [new SpinalNodePointer(element)](#new_SpinalNodePointer_new)
    * [.setElement(element)](#SpinalNodePointer+setElement)
    * [.getId()](#SpinalNodePointer+getId) ⇒ <code>Str</code>
    * [.getId()](#SpinalNodePointer+getId) ⇒ <code>Str</code>

<a name="new_SpinalNodePointer_new"></a>

### new SpinalNodePointer(element)

| Param | Type | Description |
| --- | --- | --- |
| element | <code>SpinalNode</code> \| <code>Model</code> | Element to wich the SpinalNodePointer will point |

<a name="SpinalNodePointer+setElement"></a>

### spinalNodePointer.setElement(element)
Sets pointer to point to an element.

**Kind**: instance method of [<code>SpinalNodePointer</code>](#SpinalNodePointer)  

| Param | Type |
| --- | --- |
| element | <code>SpinalNode</code> \| <code>Model</code> | 

<a name="SpinalNodePointer+getId"></a>

### spinalNodePointer.getId() ⇒ <code>Str</code>
Returns the id of the pointed element.

**Kind**: instance method of [<code>SpinalNodePointer</code>](#SpinalNodePointer)  
**Returns**: <code>Str</code> - Id of the pointed element  
<a name="SpinalNodePointer+getId"></a>

### spinalNodePointer.getId() ⇒ <code>Str</code>
This function returns the type of the pointed element.

**Kind**: instance method of [<code>SpinalNodePointer</code>](#SpinalNodePointer)  
**Returns**: <code>Str</code> - Type of the pointed element  
<a name="BaseSpinalRelation"></a>

## BaseSpinalRelation
**Kind**: global class  

* [BaseSpinalRelation](#BaseSpinalRelation)
    * [new BaseSpinalRelation(name)](#new_BaseSpinalRelation_new)
    * [.getParent()](#BaseSpinalRelation+getParent) ⇒ <code>Promise.&lt;SpinalNode&gt;</code>
    * [.setParent(parent)](#BaseSpinalRelation+setParent)
    * [.getName()](#BaseSpinalRelation+getName) ⇒ <code>Str</code>
    * [.getType()](#BaseSpinalRelation+getType) ⇒ <code>Number</code>
    * [.getChildrenIds()](#BaseSpinalRelation+getChildrenIds) ⇒ <code>Array</code>
    * [.getChildren()](#BaseSpinalRelation+getChildren) ⇒ <code>Promise.&lt;Lst&gt;</code>
    * [.addChild(node)](#BaseSpinalRelation+addChild)
    * [.removeChild(node)](#BaseSpinalRelation+removeChild) ⇒ <code>Promise.&lt;Boolean&gt;</code>
    * [.removeChildren()](#BaseSpinalRelation+removeChildren)
    * [.removeFromGraph()](#BaseSpinalRelation+removeFromGraph)

<a name="new_BaseSpinalRelation_new"></a>

### new BaseSpinalRelation(name)

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | Name of the relation |

<a name="BaseSpinalRelation+getParent"></a>

### baseSpinalRelation.getParent() ⇒ <code>Promise.&lt;SpinalNode&gt;</code>
Returns the parent of the relation.

**Kind**: instance method of [<code>BaseSpinalRelation</code>](#BaseSpinalRelation)  
**Returns**: <code>Promise.&lt;SpinalNode&gt;</code> - returns a promise where the resolve is the parent  
<a name="BaseSpinalRelation+setParent"></a>

### baseSpinalRelation.setParent(parent)
Sets the parent of the relation. If a parent was already set, the parent relation is removed.

**Kind**: instance method of [<code>BaseSpinalRelation</code>](#BaseSpinalRelation)  

| Param | Type | Description |
| --- | --- | --- |
| parent | <code>SpinalNode</code> | New parent of the relation |

<a name="BaseSpinalRelation+getName"></a>

### baseSpinalRelation.getName() ⇒ <code>Str</code>
Returns the name of the relation.

**Kind**: instance method of [<code>BaseSpinalRelation</code>](#BaseSpinalRelation)  
**Returns**: <code>Str</code> - Name of the relation  
<a name="BaseSpinalRelation+getType"></a>

### baseSpinalRelation.getType() ⇒ <code>Number</code>
Returns the type of the relation.

**Kind**: instance method of [<code>BaseSpinalRelation</code>](#BaseSpinalRelation)  
**Returns**: <code>Number</code> - Type of the relation  
<a name="BaseSpinalRelation+getChildrenIds"></a>

### baseSpinalRelation.getChildrenIds() ⇒ <code>Array</code>
Retrieves all the ids of the children of the relation and return them inside an array.

**Kind**: instance method of [<code>BaseSpinalRelation</code>](#BaseSpinalRelation)  
**Returns**: <code>Array</code> - Array containing all the children ids of the relation  
<a name="BaseSpinalRelation+getChildren"></a>

### baseSpinalRelation.getChildren() ⇒ <code>Promise.&lt;Lst&gt;</code>
Return all the children of the relation.

**Kind**: instance method of [<code>BaseSpinalRelation</code>](#BaseSpinalRelation)  
**Returns**: <code>Promise.&lt;Lst&gt;</code> - Promise containing a list of the children of the relation  
<a name="BaseSpinalRelation+addChild"></a>

### baseSpinalRelation.addChild(node)
Adds a node to the relation.

**Kind**: instance method of [<code>BaseSpinalRelation</code>](#BaseSpinalRelation)  

| Param | Type | Description |
| --- | --- | --- |
| node | <code>SpinalNode</code> \| <code>Model</code> | Node to be added |

<a name="BaseSpinalRelation+removeChild"></a>

### baseSpinalRelation.removeChild(node) ⇒ <code>Promise.&lt;Boolean&gt;</code>
Removes a child from the relation.

**Kind**: instance method of [<code>BaseSpinalRelation</code>](#BaseSpinalRelation)  
**Returns**: <code>Promise.&lt;Boolean&gt;</code> - Promise containing a boolean which is true if the node was successfuly removed  

| Param | Type | Description |
| --- | --- | --- |
| node | <code>SpinalNode</code> | Child of the relation |

<a name="BaseSpinalRelation+removeChildren"></a>

### baseSpinalRelation.removeChildren()
Removes all children from the relation.

**Kind**: instance method of [<code>BaseSpinalRelation</code>](#BaseSpinalRelation)  
<a name="BaseSpinalRelation+removeFromGraph"></a>

### baseSpinalRelation.removeFromGraph()
Removes the relation from the graph.

**Kind**: instance method of [<code>BaseSpinalRelation</code>](#BaseSpinalRelation)  
<a name="SpinalRelationPtrLst"></a>

## SpinalRelationPtrLst
**Kind**: global class  

* [SpinalRelationPtrLst](#SpinalRelationPtrLst)
    * [new SpinalRelationPtrLst(name)](#new_SpinalRelationPtrLst_new)
    * [.getChildrenIds()](#SpinalRelationPtrLst+getChildrenIds) ⇒ <code>Array</code>
    * [.getChildren()](#SpinalRelationPtrLst+getChildren) ⇒ <code>Promise.&lt;Lst&gt;</code>
    * [.getType()](#SpinalRelationPtrLst+getType) ⇒ <code>Number</code>
    * [.addChild(node)](#SpinalRelationPtrLst+addChild)
    * [.removeChild(node)](#SpinalRelationPtrLst+removeChild) ⇒ <code>Promise.&lt;Boolean&gt;</code>

<a name="new_SpinalRelationPtrLst_new"></a>

### new SpinalRelationPtrLst(name)

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | Name of the relation |

<a name="SpinalRelationPtrLst+getChildrenIds"></a>

### spinalRelationPtrLst.getChildrenIds() ⇒ <code>Array</code>
Retrieves all the ids of the children of the relation and return them inside an array.

**Kind**: instance method of [<code>SpinalRelationPtrLst</code>](#SpinalRelationPtrLst)  
**Returns**: <code>Array</code> - Array containing all the children Id of the relation  
<a name="SpinalRelationPtrLst+getChildren"></a>

### spinalRelationPtrLst.getChildren() ⇒ <code>Promise.&lt;Lst&gt;</code>
Return all the children of the relation.

**Kind**: instance method of [<code>SpinalRelationPtrLst</code>](#SpinalRelationPtrLst)  
**Returns**: <code>Promise.&lt;Lst&gt;</code> - Promise  containing a list of all the children of the relation  
<a name="SpinalRelationPtrLst+getType"></a>

### spinalRelationPtrLst.getType() ⇒ <code>Number</code>
Returns the type of the relation.

**Kind**: instance method of [<code>SpinalRelationPtrLst</code>](#SpinalRelationPtrLst)  
**Returns**: <code>Number</code> - Type of the relation  
<a name="SpinalRelationPtrLst+addChild"></a>

### spinalRelationPtrLst.addChild(node)
Adds a child to the relation.

**Kind**: instance method of [<code>SpinalRelationPtrLst</code>](#SpinalRelationPtrLst)  

| Param | Type | Description |
| --- | --- | --- |
| node | <code>SpinalNode</code> \| <code>Model</code> | Node to be added |

<a name="SpinalRelationPtrLst+removeChild"></a>

### spinalRelationPtrLst.removeChild(node) ⇒ <code>Promise.&lt;Boolean&gt;</code>
Removes a child from the relation.

**Kind**: instance method of [<code>SpinalRelationPtrLst</code>](#SpinalRelationPtrLst)  
**Returns**: <code>Promise.&lt;Boolean&gt;</code> - Promise containing a boolean which is true if the node was successfuly removed  

| Param | Type | Description |
| --- | --- | --- |
| node | <code>SpinalNode</code> | Child to remove |

<a name="SpinalRelationLstPtr"></a>

## SpinalRelationLstPtr
**Kind**: global class  

* [SpinalRelationLstPtr](#SpinalRelationLstPtr)
    * [new SpinalRelationLstPtr(name)](#new_SpinalRelationLstPtr_new)
    * [.getChildrenIds()](#SpinalRelationLstPtr+getChildrenIds) ⇒ <code>Array</code>
    * [.getChildren()](#SpinalRelationLstPtr+getChildren) ⇒ <code>Promise.&lt;Lst&gt;</code>
    * [.getType()](#SpinalRelationLstPtr+getType) ⇒ <code>Number</code>
    * [.addChild(node)](#SpinalRelationLstPtr+addChild)
    * [.removeChild(node)](#SpinalRelationLstPtr+removeChild) ⇒ <code>Promise.&lt;Boolean&gt;</code>

<a name="new_SpinalRelationLstPtr_new"></a>

### new SpinalRelationLstPtr(name)

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | Name of the relation |

<a name="SpinalRelationLstPtr+getChildrenIds"></a>

### spinalRelationLstPtr.getChildrenIds() ⇒ <code>Array</code>
Retrieves all the ids of the children of the relation and return them inside an array.

**Kind**: instance method of [<code>SpinalRelationLstPtr</code>](#SpinalRelationLstPtr)  
**Returns**: <code>Array</code> - Array containing all the children Id of the relation  
<a name="SpinalRelationLstPtr+getChildren"></a>

### spinalRelationLstPtr.getChildren() ⇒ <code>Promise.&lt;Lst&gt;</code>
Return all the children of the relation.

**Kind**: instance method of [<code>SpinalRelationLstPtr</code>](#SpinalRelationLstPtr)  
**Returns**: <code>Promise.&lt;Lst&gt;</code> - Promise  containing a list of all the children of the relation  
<a name="SpinalRelationLstPtr+getType"></a>

### spinalRelationLstPtr.getType() ⇒ <code>Number</code>
Returns the type of the relation.

**Kind**: instance method of [<code>SpinalRelationLstPtr</code>](#SpinalRelationLstPtr)  
**Returns**: <code>Number</code> - Type of the relation  
<a name="SpinalRelationLstPtr+addChild"></a>

### spinalRelationLstPtr.addChild(node)
Adds a child to the relation.

**Kind**: instance method of [<code>SpinalRelationLstPtr</code>](#SpinalRelationLstPtr)  

| Param | Type | Description |
| --- | --- | --- |
| node | <code>SpinalNode</code> \| <code>Model</code> | Node to be added |

<a name="SpinalRelationLstPtr+removeChild"></a>

### spinalRelationLstPtr.removeChild(node) ⇒ <code>Promise.&lt;Boolean&gt;</code>
Removes a child from the relation.

**Kind**: instance method of [<code>SpinalRelationLstPtr</code>](#SpinalRelationLstPtr)  
**Returns**: <code>Promise.&lt;Boolean&gt;</code> - Promise containing a boolean which is true if the node was successfuly removed  

| Param | Type | Description |
| --- | --- | --- |
| node | <code>SpinalNode</code> | Child to remove |

<a name="SpinalRelationRef"></a>

## SpinalRelationRef
**Kind**: global class  

* [SpinalRelationRef](#SpinalRelationRef)
    * [new SpinalRelationRef(name)](#new_SpinalRelationRef_new)
    * [.getChildrenIds()](#SpinalRelationRef+getChildrenIds) ⇒ <code>Array</code>
    * [.getChildren()](#SpinalRelationRef+getChildren) ⇒ <code>Promise.&lt;Lst&gt;</code>
    * [.getType()](#SpinalRelationRef+getType) ⇒ <code>Number</code>
    * [.addChild(node)](#SpinalRelationRef+addChild)
    * [.removeChild(node)](#SpinalRelationRef+removeChild) ⇒ <code>Promise.&lt;Boolean&gt;</code>

<a name="new_SpinalRelationRef_new"></a>

### new SpinalRelationRef(name)

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | Name of the relation |

<a name="SpinalRelationRef+getChildrenIds"></a>

### spinalRelationRef.getChildrenIds() ⇒ <code>Array</code>
Retrieves all the ids of the children of the relation and return them inside an array.

**Kind**: instance method of [<code>SpinalRelationRef</code>](#SpinalRelationRef)  
**Returns**: <code>Array</code> - Array containing all the children Id of the relation  
<a name="SpinalRelationRef+getChildren"></a>

### spinalRelationRef.getChildren() ⇒ <code>Promise.&lt;Lst&gt;</code>
Return all the children of the relation.

**Kind**: instance method of [<code>SpinalRelationRef</code>](#SpinalRelationRef)  
**Returns**: <code>Promise.&lt;Lst&gt;</code> - Promise  containing a list of all the children of the relation  
<a name="SpinalRelationRef+getType"></a>

### spinalRelationRef.getType() ⇒ <code>Number</code>
Returns the type of the relation.

**Kind**: instance method of [<code>SpinalRelationRef</code>](#SpinalRelationRef)  
**Returns**: <code>Number</code> - Type of the relation  
<a name="SpinalRelationRef+addChild"></a>

### spinalRelationRef.addChild(node)
Adds a child to the relation.

**Kind**: instance method of [<code>SpinalRelationRef</code>](#SpinalRelationRef)  

| Param | Type | Description |
| --- | --- | --- |
| node | <code>SpinalNode</code> \| <code>Model</code> | Node to be added |

<a name="SpinalRelationRef+removeChild"></a>

### spinalRelationRef.removeChild(node) ⇒ <code>Promise.&lt;Boolean&gt;</code>
Removes a child from the relation.

**Kind**: instance method of [<code>SpinalRelationRef</code>](#SpinalRelationRef)  
**Returns**: <code>Promise.&lt;Boolean&gt;</code> - Promise containing a boolean which is true if the node was successfuly removed  

| Param | Type | Description |
| --- | --- | --- |
| node | <code>SpinalNode</code> | Child to remove |

