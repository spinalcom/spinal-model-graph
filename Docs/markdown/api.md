<a name="SpinalMap"></a>

## SpinalMap
**Kind**: global class  

* [SpinalMap](#SpinalMap)
    * [new SpinalMap(init)](#new_SpinalMap_new)
    * [.setElement(key, value)](#SpinalMap+setElement)
    * [.getElement(key)](#SpinalMap+getElement) ⇒ <code>\*</code>
    * [.has(key)](#SpinalMap+has) ⇒ <code>Boolean</code>
    * [.hasKey()](#SpinalMap+hasKey) ⇒ <code>Boolean</code>
    * [.keys()](#SpinalMap+keys) ⇒ <code>Array.&lt;String&gt;</code>
    * [.entries()](#SpinalMap+entries) ⇒ <code>Array.&lt;Array.&lt;String, \*&gt;&gt;</code>
    * [.delete(key)](#SpinalMap+delete)
    * [.clear()](#SpinalMap+clear)
    * [.forEach(fun)](#SpinalMap+forEach)

<a name="new_SpinalMap_new"></a>

### new SpinalMap(init)
Constructor for the SpinalMap class.


| Param | Type | Description |
| --- | --- | --- |
| init | <code>Array.&lt;Array.&lt;String, \*&gt;&gt;</code> | Array of arrays of key-value pairs |

<a name="SpinalMap+setElement"></a>

### spinalMap.setElement(key, value)
Sets the value corresponding to the key.

**Kind**: instance method of [<code>SpinalMap</code>](#SpinalMap)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | Key to the value |
| value | <code>\*</code> | New value |

<a name="SpinalMap+getElement"></a>

### spinalMap.getElement(key) ⇒ <code>\*</code>
Returns the value associated to the key, or undefined if there is none.

**Kind**: instance method of [<code>SpinalMap</code>](#SpinalMap)  
**Returns**: <code>\*</code> - Value corresponding to the key  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | Key to the value |

<a name="SpinalMap+has"></a>

### spinalMap.has(key) ⇒ <code>Boolean</code>
Returns a boolean asserting whether a value has been associated to the key or not.

**Kind**: instance method of [<code>SpinalMap</code>](#SpinalMap)  
**Returns**: <code>Boolean</code> - Return true if the key exists  

| Param | Description |
| --- | --- |
| key | Key |

<a name="SpinalMap+hasKey"></a>

### spinalMap.hasKey() ⇒ <code>Boolean</code>
Returns a boolean asserting whether the map contains any key.

**Kind**: instance method of [<code>SpinalMap</code>](#SpinalMap)  
**Returns**: <code>Boolean</code> - Return true if the map contains at least one key  
<a name="SpinalMap+keys"></a>

### spinalMap.keys() ⇒ <code>Array.&lt;String&gt;</code>
Returns an array that contains the keys for each element in the map in insertion order.

**Kind**: instance method of [<code>SpinalMap</code>](#SpinalMap)  
**Returns**: <code>Array.&lt;String&gt;</code> - Array containing all the keys in the map  
<a name="SpinalMap+entries"></a>

### spinalMap.entries() ⇒ <code>Array.&lt;Array.&lt;String, \*&gt;&gt;</code>
Returns an array that contains the keys and the values for each element in the map in insertion order.

**Kind**: instance method of [<code>SpinalMap</code>](#SpinalMap)  
**Returns**: <code>Array.&lt;Array.&lt;String, \*&gt;&gt;</code> - Array containing all the keys and values in the map  
<a name="SpinalMap+delete"></a>

### spinalMap.delete(key)
Deletes an element.

**Kind**: instance method of [<code>SpinalMap</code>](#SpinalMap)  

| Param | Description |
| --- | --- |
| key | Key of the element |

<a name="SpinalMap+clear"></a>

### spinalMap.clear()
Deletes all elements.

**Kind**: instance method of [<code>SpinalMap</code>](#SpinalMap)  
<a name="SpinalMap+forEach"></a>

### spinalMap.forEach(fun)
Applies a function to each of the values in the map.

**Kind**: instance method of [<code>SpinalMap</code>](#SpinalMap)  

| Param | Type | Description |
| --- | --- | --- |
| fun | <code>function</code> | Funcion to apply |

<a name="SpinalContext"></a>

## SpinalContext
**Kind**: global class  

* [SpinalContext](#SpinalContext)
    * [new SpinalContext(name, type, element)](#new_SpinalContext_new)
    * [.getRelationNames()](#SpinalContext+getRelationNames) ⇒ <code>Lst.&lt;Str&gt;</code>
    * [.addRelationNames(relationNames)](#SpinalContext+addRelationNames) ⇒ <code>Boolean</code>
    * [.addChild(child, relationName, relationType)](#SpinalContext+addChild) ⇒ <code>Promise.&lt;SpinalNode&gt;</code>
    * [.addChildInContext(child, relationName, relationType, context)](#SpinalContext+addChildInContext) ⇒ <code>Promise.&lt;SpinalNode&gt;</code>
    * [.getChildrenInContext(context)](#SpinalContext+getChildrenInContext) ⇒ <code>Promise.&lt;Array.&lt;SpinalNode&gt;&gt;</code>

<a name="new_SpinalContext_new"></a>

### new SpinalContext(name, type, element)
Constructor for the SpinalContext class.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| name | <code>String</code> | <code>undefined</code> | Name of the context |
| type | <code>String</code> | <code>SpinalContext</code> | Type of the context, usually unused |
| element | <code>SpinalNode</code> \| <code>Model</code> |  | Element of the context, usually unused |

<a name="SpinalContext+getRelationNames"></a>

### spinalContext.getRelationNames() ⇒ <code>Lst.&lt;Str&gt;</code>
Returns the relation names of the context.

**Kind**: instance method of [<code>SpinalContext</code>](#SpinalContext)  
**Returns**: <code>Lst.&lt;Str&gt;</code> - The relation names that the context knows  
<a name="SpinalContext+addRelationNames"></a>

### spinalContext.addRelationNames(relationNames) ⇒ <code>Boolean</code>
Adds relation names to the relation names known by the context.

**Kind**: instance method of [<code>SpinalContext</code>](#SpinalContext)  
**Returns**: <code>Boolean</code> - Return false if all the relation names are already known  

| Param | Type | Description |
| --- | --- | --- |
| relationNames | <code>Array.&lt;String&gt;</code> \| <code>String</code> | Names of the relations |

<a name="SpinalContext+addChild"></a>

### spinalContext.addChild(child, relationName, relationType) ⇒ <code>Promise.&lt;SpinalNode&gt;</code>
Adds a child with a SpinalRelationLstPtrType.

**Kind**: instance method of [<code>SpinalContext</code>](#SpinalContext)  
**Returns**: <code>Promise.&lt;SpinalNode&gt;</code> - The child node in a promise  

| Param | Type | Description |
| --- | --- | --- |
| child | <code>SpinalNode</code> \| <code>Model</code> | Node to add as child |
| relationName | <code>String</code> | Name of the relation |
| relationType | <code>String</code> | This parameter is here only to properly override the parent method |

<a name="SpinalContext+addChildInContext"></a>

### spinalContext.addChildInContext(child, relationName, relationType, context) ⇒ <code>Promise.&lt;SpinalNode&gt;</code>
Adds a child with a SpinalRelationLstPtrType and notices the context if a new relation was created.

**Kind**: instance method of [<code>SpinalContext</code>](#SpinalContext)  
**Returns**: <code>Promise.&lt;SpinalNode&gt;</code> - The child node in a promise  

| Param | Type | Description |
| --- | --- | --- |
| child | <code>SpinalNode</code> \| <code>Model</code> | Node to add as child |
| relationName | <code>String</code> | Name of the relation |
| relationType | <code>String</code> | This parameter is here only to properly override the parent method |
| context | [<code>SpinalContext</code>](#SpinalContext) | Context to update, usually unused |

<a name="SpinalContext+getChildrenInContext"></a>

### spinalContext.getChildrenInContext(context) ⇒ <code>Promise.&lt;Array.&lt;SpinalNode&gt;&gt;</code>
Return the children of the node that are registered in the context

**Kind**: instance method of [<code>SpinalContext</code>](#SpinalContext)  
**Returns**: <code>Promise.&lt;Array.&lt;SpinalNode&gt;&gt;</code> - The children that were found  

| Param | Type | Description |
| --- | --- | --- |
| context | [<code>SpinalContext</code>](#SpinalContext) | Context to use for the search, this by default |

<a name="SpinalGraph"></a>

## SpinalGraph
**Kind**: global class  

* [SpinalGraph](#SpinalGraph)
    * [new SpinalGraph(name, type, element)](#new_SpinalGraph_new)
    * [.addContext(context)](#SpinalGraph+addContext) ⇒ <code>Promise.&lt;nothing&gt;</code>
    * [.getContext(name)](#SpinalGraph+getContext) ⇒ <code>SpinalContext</code> \| <code>undefined</code>
    * [.removeFromGraph()](#SpinalGraph+removeFromGraph) ⇒ <code>Promise.&lt;nothing&gt;</code>

<a name="new_SpinalGraph_new"></a>

### new SpinalGraph(name, type, element)
Constructor for the SpinalGraph class.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| name | <code>String</code> | <code>undefined</code> | Name of the graph, usually unused |
| type | <code>String</code> | <code>SpinalGraph</code> | Type of the graph, usually unused |
| element | <code>SpinalNode</code> \| <code>Model</code> |  | Element of the graph, usually unused |

<a name="SpinalGraph+addContext"></a>

### spinalGraph.addContext(context) ⇒ <code>Promise.&lt;nothing&gt;</code>
Adds a context to the graph.

**Kind**: instance method of [<code>SpinalGraph</code>](#SpinalGraph)  
**Returns**: <code>Promise.&lt;nothing&gt;</code> - An empty promise  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>SpinalContext</code> | Context to be added |

<a name="SpinalGraph+getContext"></a>

### spinalGraph.getContext(name) ⇒ <code>SpinalContext</code> \| <code>undefined</code>
Searches for a context using its name.

**Kind**: instance method of [<code>SpinalGraph</code>](#SpinalGraph)  
**Returns**: <code>SpinalContext</code> \| <code>undefined</code> - The wanted context or undefined  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | Name of the context |

<a name="SpinalGraph+removeFromGraph"></a>

### spinalGraph.removeFromGraph() ⇒ <code>Promise.&lt;nothing&gt;</code>
Empty override of the SpinalNode method.

**Kind**: instance method of [<code>SpinalGraph</code>](#SpinalGraph)  
**Returns**: <code>Promise.&lt;nothing&gt;</code> - An empty promise  
<a name="SpinalNode"></a>

## SpinalNode
**Kind**: global class  

* [SpinalNode](#SpinalNode)
    * [new SpinalNode(name, type, element)](#new_SpinalNode_new)
    * [.getId()](#SpinalNode+getId) ⇒ <code>Str</code>
    * [.getName()](#SpinalNode+getName) ⇒ <code>Str</code>
    * [.getType()](#SpinalNode+getType) ⇒ <code>Str</code>
    * [.getElement()](#SpinalNode+getElement) ⇒ <code>Promise.&lt;\*&gt;</code>
    * [.getChildrenIds()](#SpinalNode+getChildrenIds) ⇒ <code>Array.&lt;String&gt;</code>
    * [.getNbChildren()](#SpinalNode+getNbChildren) ⇒ <code>Number</code>
    * [.addContextId(id)](#SpinalNode+addContextId)
    * [.getContextIds()](#SpinalNode+getContextIds) ⇒ <code>Array.&lt;String&gt;</code>
    * [.belongsToContext(context)](#SpinalNode+belongsToContext) ⇒ <code>Boolean</code>
    * [.hasRelation(relationName, relationType)](#SpinalNode+hasRelation) ⇒ <code>Boolean</code>
    * [.hasRelations(relationNames, relationType)](#SpinalNode+hasRelations) ⇒ <code>Boolean</code>
    * [.addChild(child, relationName, relationType)](#SpinalNode+addChild) ⇒ [<code>Promise.&lt;SpinalNode&gt;</code>](#SpinalNode)
    * [.addChildInContext(child, relationName, relationType, context)](#SpinalNode+addChildInContext) ⇒ [<code>Promise.&lt;SpinalNode&gt;</code>](#SpinalNode)
    * [.removeChild(node, relationName, relationType)](#SpinalNode+removeChild) ⇒ <code>Promise.&lt;Boolean&gt;</code>
    * [.removeChildren(relationNames)](#SpinalNode+removeChildren) ⇒ <code>Promise.&lt;Array.&lt;Boolean&gt;&gt;</code>
    * [.removeFromGraph()](#SpinalNode+removeFromGraph) ⇒ <code>Promise.&lt;nothing&gt;</code>
    * [.getChildren(relationNames)](#SpinalNode+getChildren) ⇒ <code>Promise.&lt;Array.&lt;SpinalNode&gt;&gt;</code>
    * [.getChildrenInContext(context)](#SpinalNode+getChildrenInContext) ⇒ <code>Promise.&lt;Array.&lt;SpinalNode&gt;&gt;</code>
    * [.getParents(relationNames)](#SpinalNode+getParents) ⇒ <code>Promise.&lt;Array.&lt;SpinalNode&gt;&gt;</code>
    * [.find(relationNames, predicate)](#SpinalNode+find) ⇒ <code>Promise.&lt;Array.&lt;SpinalNode&gt;&gt;</code>
    * [.findInContext(context, predicate)](#SpinalNode+findInContext) ⇒ <code>Promise.&lt;Array.&lt;SpinalNode&gt;&gt;</code>
    * [.forEach(relationNames, callback)](#SpinalNode+forEach)
    * [.forEachInContext(context, callback)](#SpinalNode+forEachInContext)
    * [.map(relationNames, callback)](#SpinalNode+map) ⇒ <code>Promise.&lt;Array.&lt;\*&gt;&gt;</code>
    * [.mapInContext(context, callback)](#SpinalNode+mapInContext) ⇒ <code>Promise.&lt;Array.&lt;\*&gt;&gt;</code>

<a name="new_SpinalNode_new"></a>

### new SpinalNode(name, type, element)
Constructor for the SpinalNode class.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| name | <code>String</code> | <code>undefined</code> | Name of the node |
| type | <code>String</code> | <code>SpinalNode</code> | Type of the node |
| element | [<code>SpinalNode</code>](#SpinalNode) \| <code>Model</code> |  | Element of the node |

<a name="SpinalNode+getId"></a>

### spinalNode.getId() ⇒ <code>Str</code>
Returns the id.

**Kind**: instance method of [<code>SpinalNode</code>](#SpinalNode)  
**Returns**: <code>Str</code> - Id of the node  
<a name="SpinalNode+getName"></a>

### spinalNode.getName() ⇒ <code>Str</code>
Returns the name.

**Kind**: instance method of [<code>SpinalNode</code>](#SpinalNode)  
**Returns**: <code>Str</code> - Name of the node  
<a name="SpinalNode+getType"></a>

### spinalNode.getType() ⇒ <code>Str</code>
Returns the type.

**Kind**: instance method of [<code>SpinalNode</code>](#SpinalNode)  
**Returns**: <code>Str</code> - Type of the node  
<a name="SpinalNode+getElement"></a>

### spinalNode.getElement() ⇒ <code>Promise.&lt;\*&gt;</code>
Returns the element.

**Kind**: instance method of [<code>SpinalNode</code>](#SpinalNode)  
**Returns**: <code>Promise.&lt;\*&gt;</code> - A promise where the parameter of the resolve method is the element  
<a name="SpinalNode+getChildrenIds"></a>

### spinalNode.getChildrenIds() ⇒ <code>Array.&lt;String&gt;</code>
Returns all the children ids in an array.

**Kind**: instance method of [<code>SpinalNode</code>](#SpinalNode)  
**Returns**: <code>Array.&lt;String&gt;</code> - Ids of the children  
<a name="SpinalNode+getNbChildren"></a>

### spinalNode.getNbChildren() ⇒ <code>Number</code>
Computes and returns the number of children of the node.

**Kind**: instance method of [<code>SpinalNode</code>](#SpinalNode)  
**Returns**: <code>Number</code> - The number of children  
<a name="SpinalNode+addContextId"></a>

### spinalNode.addContextId(id)
Adds an id to the context ids of the node.

**Kind**: instance method of [<code>SpinalNode</code>](#SpinalNode)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | Id of the context |

<a name="SpinalNode+getContextIds"></a>

### spinalNode.getContextIds() ⇒ <code>Array.&lt;String&gt;</code>
Returns a list of the contexts the node is associated to.

**Kind**: instance method of [<code>SpinalNode</code>](#SpinalNode)  
**Returns**: <code>Array.&lt;String&gt;</code> - An array of ids of the associated contexts  
<a name="SpinalNode+belongsToContext"></a>

### spinalNode.belongsToContext(context) ⇒ <code>Boolean</code>
Returns true if the node belongs to the context.

**Kind**: instance method of [<code>SpinalNode</code>](#SpinalNode)  
**Returns**: <code>Boolean</code> - A boolean  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>SpinalContext</code> | The context that might own the node |

<a name="SpinalNode+hasRelation"></a>

### spinalNode.hasRelation(relationName, relationType) ⇒ <code>Boolean</code>
Verify if the node contains the relation name.

**Kind**: instance method of [<code>SpinalNode</code>](#SpinalNode)  
**Returns**: <code>Boolean</code> - Return true is the relation is contained in the node and false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| relationName | <code>String</code> | Name of the relation |
| relationType | <code>String</code> | Type of the relation |

<a name="SpinalNode+hasRelations"></a>

### spinalNode.hasRelations(relationNames, relationType) ⇒ <code>Boolean</code>
Verify if the node contains all the relation names.

**Kind**: instance method of [<code>SpinalNode</code>](#SpinalNode)  
**Returns**: <code>Boolean</code> - Return true if the node contains all the relations in relationNames, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| relationNames | <code>Array.&lt;String&gt;</code> | Array containing all the relation name |
| relationType | <code>String</code> | Type of the relations |

<a name="SpinalNode+addChild"></a>

### spinalNode.addChild(child, relationName, relationType) ⇒ [<code>Promise.&lt;SpinalNode&gt;</code>](#SpinalNode)
Add the node as child of the relation.

**Kind**: instance method of [<code>SpinalNode</code>](#SpinalNode)  
**Returns**: [<code>Promise.&lt;SpinalNode&gt;</code>](#SpinalNode) - The child node in a promise  

| Param | Type | Description |
| --- | --- | --- |
| child | [<code>SpinalNode</code>](#SpinalNode) \| <code>Model</code> | Element to add as child |
| relationName | <code>String</code> | Name of the relation |
| relationType | <code>String</code> | Type of the relation |

<a name="SpinalNode+addChildInContext"></a>

### spinalNode.addChildInContext(child, relationName, relationType, context) ⇒ [<code>Promise.&lt;SpinalNode&gt;</code>](#SpinalNode)
Adds a child and notices the context if a new relation was created.

**Kind**: instance method of [<code>SpinalNode</code>](#SpinalNode)  
**Returns**: [<code>Promise.&lt;SpinalNode&gt;</code>](#SpinalNode) - The child node in a promise  

| Param | Type | Description |
| --- | --- | --- |
| child | [<code>SpinalNode</code>](#SpinalNode) \| <code>Model</code> | Node to add as child |
| relationName | <code>String</code> | Name of the relation |
| relationType | <code>String</code> | Type of the relation |
| context | <code>SpinalContext</code> | Context to update |

<a name="SpinalNode+removeChild"></a>

### spinalNode.removeChild(node, relationName, relationType) ⇒ <code>Promise.&lt;Boolean&gt;</code>
Remove the node from the relation children.

**Kind**: instance method of [<code>SpinalNode</code>](#SpinalNode)  
**Returns**: <code>Promise.&lt;Boolean&gt;</code> - A promise containing true if the node was a child  

| Param | Type | Description |
| --- | --- | --- |
| node | [<code>SpinalNode</code>](#SpinalNode) | Node to remove |
| relationName | <code>String</code> | Name of the relation to wich the node belongs |
| relationType | <code>String</code> | Type of the relation to wich the node belongs |

<a name="SpinalNode+removeChildren"></a>

### spinalNode.removeChildren(relationNames) ⇒ <code>Promise.&lt;Array.&lt;Boolean&gt;&gt;</code>
Removes children with the relationNames.

**Kind**: instance method of [<code>SpinalNode</code>](#SpinalNode)  
**Returns**: <code>Promise.&lt;Array.&lt;Boolean&gt;&gt;</code> - A promise containing an array of boolean  

| Param | Type | Description |
| --- | --- | --- |
| relationNames | <code>Array.&lt;String&gt;</code> | Names of the relations to empty |

<a name="SpinalNode+removeFromGraph"></a>

### spinalNode.removeFromGraph() ⇒ <code>Promise.&lt;nothing&gt;</code>
Remove the node from the graph i.e remove the node from all the parent relations and remove all the children relations.
This operation might delete all the sub-graph under this node.
After this operation the node can be deleted without fear.

**Kind**: instance method of [<code>SpinalNode</code>](#SpinalNode)  
**Returns**: <code>Promise.&lt;nothing&gt;</code> - An empty promise  
<a name="SpinalNode+getChildren"></a>

### spinalNode.getChildren(relationNames) ⇒ <code>Promise.&lt;Array.&lt;SpinalNode&gt;&gt;</code>
Returns the children of the node for the relation names.

**Kind**: instance method of [<code>SpinalNode</code>](#SpinalNode)  
**Returns**: <code>Promise.&lt;Array.&lt;SpinalNode&gt;&gt;</code> - The children that were found  

| Param | Type | Description |
| --- | --- | --- |
| relationNames | <code>Array.&lt;String&gt;</code> | Array containing the relation names of the desired children |

<a name="SpinalNode+getChildrenInContext"></a>

### spinalNode.getChildrenInContext(context) ⇒ <code>Promise.&lt;Array.&lt;SpinalNode&gt;&gt;</code>
Return the children of the node that are registered in the context

**Kind**: instance method of [<code>SpinalNode</code>](#SpinalNode)  
**Returns**: <code>Promise.&lt;Array.&lt;SpinalNode&gt;&gt;</code> - The children that were found  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>SpinalContext</code> | Context to use for the search |

<a name="SpinalNode+getParents"></a>

### spinalNode.getParents(relationNames) ⇒ <code>Promise.&lt;Array.&lt;SpinalNode&gt;&gt;</code>
Return all parents for the relation names no matter the type of relation

**Kind**: instance method of [<code>SpinalNode</code>](#SpinalNode)  
**Returns**: <code>Promise.&lt;Array.&lt;SpinalNode&gt;&gt;</code> - Promise containing the parents that were found  

| Param | Type | Description |
| --- | --- | --- |
| relationNames | <code>Array.&lt;String&gt;</code> | Array containing the relation names of the desired parents |

<a name="SpinalNode+find"></a>

### spinalNode.find(relationNames, predicate) ⇒ <code>Promise.&lt;Array.&lt;SpinalNode&gt;&gt;</code>
Recursively finds all the children nodes for which the predicate is true.

**Kind**: instance method of [<code>SpinalNode</code>](#SpinalNode)  
**Returns**: <code>Promise.&lt;Array.&lt;SpinalNode&gt;&gt;</code> - The nodes that were found  

| Param | Type | Description |
| --- | --- | --- |
| relationNames | <code>Array.&lt;String&gt;</code> | Array containing the relation names to follow |
| predicate | <code>function</code> | Function returning true if the node needs to be returned |

<a name="SpinalNode+findInContext"></a>

### spinalNode.findInContext(context, predicate) ⇒ <code>Promise.&lt;Array.&lt;SpinalNode&gt;&gt;</code>
Recursively finds all the children nodes in the context for which the predicate is true..

**Kind**: instance method of [<code>SpinalNode</code>](#SpinalNode)  
**Returns**: <code>Promise.&lt;Array.&lt;SpinalNode&gt;&gt;</code> - The nodes that were found  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>SpinalContext</code> | Context to use for the search |
| predicate | <code>function</code> | Function returning true if the node needs to be returned |

<a name="SpinalNode+forEach"></a>

### spinalNode.forEach(relationNames, callback)
Recursively applies a function to all the children nodes.

**Kind**: instance method of [<code>SpinalNode</code>](#SpinalNode)  

| Param | Type | Description |
| --- | --- | --- |
| relationNames | <code>Array.&lt;String&gt;</code> | Array containing the relation names to follow |
| callback | <code>function</code> | Function to apply to the nodes |

<a name="SpinalNode+forEachInContext"></a>

### spinalNode.forEachInContext(context, callback)
Recursively applies a function to all the children nodes in the context.

**Kind**: instance method of [<code>SpinalNode</code>](#SpinalNode)  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>SpinalContext</code> | Context to use for the search |
| callback | <code>function</code> | Function to apply to the nodes |

<a name="SpinalNode+map"></a>

### spinalNode.map(relationNames, callback) ⇒ <code>Promise.&lt;Array.&lt;\*&gt;&gt;</code>
Recursively applies a function to all the children nodes and returns the results in an array.

**Kind**: instance method of [<code>SpinalNode</code>](#SpinalNode)  
**Returns**: <code>Promise.&lt;Array.&lt;\*&gt;&gt;</code> - The results of the callback for each node  

| Param | Type | Description |
| --- | --- | --- |
| relationNames | <code>Array.&lt;String&gt;</code> | Array containing the relation names to follow |
| callback | <code>function</code> | Function to apply to the nodes |

<a name="SpinalNode+mapInContext"></a>

### spinalNode.mapInContext(context, callback) ⇒ <code>Promise.&lt;Array.&lt;\*&gt;&gt;</code>
Recursively applies a function to all the children nodes in the context and returns the results in an array.

**Kind**: instance method of [<code>SpinalNode</code>](#SpinalNode)  
**Returns**: <code>Promise.&lt;Array.&lt;\*&gt;&gt;</code> - The results of the callback for each node  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>SpinalContext</code> | Context to use for the search |
| callback | <code>function</code> | Function to apply to the nodes |

<a name="SpinalSet"></a>

## SpinalSet
**Kind**: global class  

* [SpinalSet](#SpinalSet)
    * [new SpinalSet(init)](#new_SpinalSet_new)
    * [.add(value)](#SpinalSet+add)
    * [.has(value)](#SpinalSet+has) ⇒ <code>Boolean</code>
    * [.values()](#SpinalSet+values) ⇒ <code>Array.&lt;String&gt;</code>
    * [.delete(value)](#SpinalSet+delete)
    * [.clear()](#SpinalSet+clear)
    * [.size()](#SpinalSet+size) ⇒ <code>Number</code>
    * [.forEach(fun)](#SpinalSet+forEach)

<a name="new_SpinalSet_new"></a>

### new SpinalSet(init)
Constructor for the SpinalSet class.


| Param | Type | Description |
| --- | --- | --- |
| init | <code>Array.&lt;\*&gt;</code> | Array of values |

<a name="SpinalSet+add"></a>

### spinalSet.add(value)
Appends a new element with the given value to the set.

**Kind**: instance method of [<code>SpinalSet</code>](#SpinalSet)  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>String</code> | Value to store in the set |

<a name="SpinalSet+has"></a>

### spinalSet.has(value) ⇒ <code>Boolean</code>
Returns a boolean asserting whether the value is in the set or not.

**Kind**: instance method of [<code>SpinalSet</code>](#SpinalSet)  
**Returns**: <code>Boolean</code> - Return true if the value exists  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>String</code> | Value |

<a name="SpinalSet+values"></a>

### spinalSet.values() ⇒ <code>Array.&lt;String&gt;</code>
Returns an array that contains all the values of the set.

**Kind**: instance method of [<code>SpinalSet</code>](#SpinalSet)  
**Returns**: <code>Array.&lt;String&gt;</code> - Array containing all the values in the set  
<a name="SpinalSet+delete"></a>

### spinalSet.delete(value)
Deletes an element.

**Kind**: instance method of [<code>SpinalSet</code>](#SpinalSet)  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>String</code> | Value to delete |

<a name="SpinalSet+clear"></a>

### spinalSet.clear()
Deletes all values in the set.

**Kind**: instance method of [<code>SpinalSet</code>](#SpinalSet)  
<a name="SpinalSet+size"></a>

### spinalSet.size() ⇒ <code>Number</code>
Returns the number of values in the set.

**Kind**: instance method of [<code>SpinalSet</code>](#SpinalSet)  
**Returns**: <code>Number</code> - Number of values in the set  
<a name="SpinalSet+forEach"></a>

### spinalSet.forEach(fun)
Applies a function to each of the values in the set.

**Kind**: instance method of [<code>SpinalSet</code>](#SpinalSet)  

| Param | Type | Description |
| --- | --- | --- |
| fun | <code>function</code> | Funcion to apply |

## Functions

<dl>
<dt><a href="#s4">s4()</a> ⇒ <code>String</code></dt>
<dd><p>Generates a random number and returns in a string.</p>
</dd>
<dt><a href="#guid">guid(name)</a> ⇒ <code>String</code></dt>
<dd><p>Creates a unique id based on a name.</p>
</dd>
</dl>

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
    * [.load()](#SpinalNodePointer+load) ⇒ <code>Model</code>
    * [.unset()](#SpinalNodePointer+unset)
    * [.getId()](#SpinalNodePointer+getId) ⇒ <code>Str</code>
    * [.getType()](#SpinalNodePointer+getType) ⇒ <code>Str</code>

<a name="new_SpinalNodePointer_new"></a>

### new SpinalNodePointer(element)
Constructor for the SpinalNodePointer class.


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

<a name="SpinalNodePointer+load"></a>

### spinalNodePointer.load() ⇒ <code>Model</code>
Loads the model to which the pointer is pointing.

**Kind**: instance method of [<code>SpinalNodePointer</code>](#SpinalNodePointer)  
**Returns**: <code>Model</code> - The model to which the pointer is pointing  
<a name="SpinalNodePointer+unset"></a>

### spinalNodePointer.unset()
Unsets the pointer.

**Kind**: instance method of [<code>SpinalNodePointer</code>](#SpinalNodePointer)  
<a name="SpinalNodePointer+getId"></a>

### spinalNodePointer.getId() ⇒ <code>Str</code>
Returns the id of the pointed element.

**Kind**: instance method of [<code>SpinalNodePointer</code>](#SpinalNodePointer)  
**Returns**: <code>Str</code> - Id of the pointed element  
<a name="SpinalNodePointer+getType"></a>

### spinalNodePointer.getType() ⇒ <code>Str</code>
This function returns the type of the pointed element.

**Kind**: instance method of [<code>SpinalNodePointer</code>](#SpinalNodePointer)  
**Returns**: <code>Str</code> - Type of the pointed element  
<a name="BaseSpinalRelation"></a>

## BaseSpinalRelation
**Kind**: global class  

* [BaseSpinalRelation](#BaseSpinalRelation)
    * [new BaseSpinalRelation(name)](#new_BaseSpinalRelation_new)
    * [.getId()](#BaseSpinalRelation+getId) ⇒ <code>Str</code>
    * [.getName()](#BaseSpinalRelation+getName) ⇒ <code>Str</code>
    * [.getParent()](#BaseSpinalRelation+getParent) ⇒ <code>Promise.&lt;SpinalNode&gt;</code>
    * [.getContextIds()](#BaseSpinalRelation+getContextIds) ⇒ <code>Array.&lt;String&gt;</code>
    * [.addContextId(id)](#BaseSpinalRelation+addContextId)
    * [.belongsToContext(context)](#BaseSpinalRelation+belongsToContext) ⇒ <code>Boolean</code>
    * [.setParent(parent)](#BaseSpinalRelation+setParent)
    * [.removeChildren(nodes)](#BaseSpinalRelation+removeChildren) ⇒ <code>Promise.&lt;Array.&lt;Boolean&gt;&gt;</code>
    * [.removeFromGraph()](#BaseSpinalRelation+removeFromGraph) ⇒ <code>Promise.&lt;nothing&gt;</code>

<a name="new_BaseSpinalRelation_new"></a>

### new BaseSpinalRelation(name)
Constructor for the BaseSpinalRelation class.


| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | Name of the relation |

<a name="BaseSpinalRelation+getId"></a>

### baseSpinalRelation.getId() ⇒ <code>Str</code>
Shortcut to id.

**Kind**: instance method of [<code>BaseSpinalRelation</code>](#BaseSpinalRelation)  
**Returns**: <code>Str</code> - Id of the relation  
<a name="BaseSpinalRelation+getName"></a>

### baseSpinalRelation.getName() ⇒ <code>Str</code>
Returns the name of the relation.

**Kind**: instance method of [<code>BaseSpinalRelation</code>](#BaseSpinalRelation)  
**Returns**: <code>Str</code> - Name of the relation  
<a name="BaseSpinalRelation+getParent"></a>

### baseSpinalRelation.getParent() ⇒ <code>Promise.&lt;SpinalNode&gt;</code>
Returns the parent of the relation.

**Kind**: instance method of [<code>BaseSpinalRelation</code>](#BaseSpinalRelation)  
**Returns**: <code>Promise.&lt;SpinalNode&gt;</code> - Returns a promise where the resolve is the parent  
<a name="BaseSpinalRelation+getContextIds"></a>

### baseSpinalRelation.getContextIds() ⇒ <code>Array.&lt;String&gt;</code>
Returns a list of the contexts the relation is associated to.

**Kind**: instance method of [<code>BaseSpinalRelation</code>](#BaseSpinalRelation)  
**Returns**: <code>Array.&lt;String&gt;</code> - A list of ids of the associated contexts  
<a name="BaseSpinalRelation+addContextId"></a>

### baseSpinalRelation.addContextId(id)
Adds an id to the context ids of the relation.

**Kind**: instance method of [<code>BaseSpinalRelation</code>](#BaseSpinalRelation)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | Id of the context |

<a name="BaseSpinalRelation+belongsToContext"></a>

### baseSpinalRelation.belongsToContext(context) ⇒ <code>Boolean</code>
Returns true if the relation belongs to the context.

**Kind**: instance method of [<code>BaseSpinalRelation</code>](#BaseSpinalRelation)  
**Returns**: <code>Boolean</code> - A boolean  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>SpinalContext</code> | The context that might own the node |

<a name="BaseSpinalRelation+setParent"></a>

### baseSpinalRelation.setParent(parent)
Sets the parent of the relation. If a parent was already set, the parent relation is removed.

**Kind**: instance method of [<code>BaseSpinalRelation</code>](#BaseSpinalRelation)  

| Param | Type | Description |
| --- | --- | --- |
| parent | <code>SpinalNode</code> | New parent of the relation |

<a name="BaseSpinalRelation+removeChildren"></a>

### baseSpinalRelation.removeChildren(nodes) ⇒ <code>Promise.&lt;Array.&lt;Boolean&gt;&gt;</code>
Removes children from the relation.

**Kind**: instance method of [<code>BaseSpinalRelation</code>](#BaseSpinalRelation)  
**Returns**: <code>Promise.&lt;Array.&lt;Boolean&gt;&gt;</code> - A promise containing an array of boolean  

| Param | Type | Description |
| --- | --- | --- |
| nodes | <code>Array.&lt;SpinalNode&gt;</code> | Childs to remove |

<a name="BaseSpinalRelation+removeFromGraph"></a>

### baseSpinalRelation.removeFromGraph() ⇒ <code>Promise.&lt;nothing&gt;</code>
Removes the relation from the graph.

**Kind**: instance method of [<code>BaseSpinalRelation</code>](#BaseSpinalRelation)  
**Returns**: <code>Promise.&lt;nothing&gt;</code> - An empty promise  
<a name="SpinalRelationPtrLst"></a>

## SpinalRelationPtrLst
**Kind**: global class  

* [SpinalRelationPtrLst](#SpinalRelationPtrLst)
    * [new SpinalRelationPtrLst(name)](#new_SpinalRelationPtrLst_new)
    * [.getChildrenIds()](#SpinalRelationPtrLst+getChildrenIds) ⇒ <code>Array.&lt;String&gt;</code>
    * [.getChildren()](#SpinalRelationPtrLst+getChildren) ⇒ <code>Promise.&lt;Array.&lt;SpinalNode&gt;&gt;</code>
    * [.getChildrenInContext(context)](#SpinalRelationPtrLst+getChildrenInContext) ⇒ <code>Promise.&lt;Array.&lt;SpinalNode&gt;&gt;</code>
    * [.getType()](#SpinalRelationPtrLst+getType) ⇒ <code>Number</code>
    * [.addChild(node)](#SpinalRelationPtrLst+addChild) ⇒ <code>Promise.&lt;SpinalNode&gt;</code>
    * [.removeChild(node)](#SpinalRelationPtrLst+removeChild) ⇒ <code>Promise.&lt;Boolean&gt;</code>
    * [.removeChildren(nodes)](#SpinalRelationPtrLst+removeChildren) ⇒ <code>Promise.&lt;Array.&lt;Boolean&gt;&gt;</code>

<a name="new_SpinalRelationPtrLst_new"></a>

### new SpinalRelationPtrLst(name)
Constructor for the SpinalRelationPtrLst class.


| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | Name of the relation |

<a name="SpinalRelationPtrLst+getChildrenIds"></a>

### spinalRelationPtrLst.getChildrenIds() ⇒ <code>Array.&lt;String&gt;</code>
Retrieves all the ids of the children of the relation and return them inside an array.

**Kind**: instance method of [<code>SpinalRelationPtrLst</code>](#SpinalRelationPtrLst)  
**Returns**: <code>Array.&lt;String&gt;</code> - Array containing all the children ids of the relation  
<a name="SpinalRelationPtrLst+getChildren"></a>

### spinalRelationPtrLst.getChildren() ⇒ <code>Promise.&lt;Array.&lt;SpinalNode&gt;&gt;</code>
Return all the children of the relation.

**Kind**: instance method of [<code>SpinalRelationPtrLst</code>](#SpinalRelationPtrLst)  
**Returns**: <code>Promise.&lt;Array.&lt;SpinalNode&gt;&gt;</code> - The children of the relation  
<a name="SpinalRelationPtrLst+getChildrenInContext"></a>

### spinalRelationPtrLst.getChildrenInContext(context) ⇒ <code>Promise.&lt;Array.&lt;SpinalNode&gt;&gt;</code>
Return all the children of the relation associated to a certain context.

**Kind**: instance method of [<code>SpinalRelationPtrLst</code>](#SpinalRelationPtrLst)  
**Returns**: <code>Promise.&lt;Array.&lt;SpinalNode&gt;&gt;</code> - The children associated to the context  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>SpinalContext</code> | Context to use for the search |

<a name="SpinalRelationPtrLst+getType"></a>

### spinalRelationPtrLst.getType() ⇒ <code>Number</code>
Returns the type of the relation.

**Kind**: instance method of [<code>SpinalRelationPtrLst</code>](#SpinalRelationPtrLst)  
**Returns**: <code>Number</code> - Type of the relation  
<a name="SpinalRelationPtrLst+addChild"></a>

### spinalRelationPtrLst.addChild(node) ⇒ <code>Promise.&lt;SpinalNode&gt;</code>
Adds a child to the relation.

**Kind**: instance method of [<code>SpinalRelationPtrLst</code>](#SpinalRelationPtrLst)  
**Returns**: <code>Promise.&lt;SpinalNode&gt;</code> - Promise containing the node that was added  

| Param | Type | Description |
| --- | --- | --- |
| node | <code>SpinalNode</code> \| <code>Model</code> | Node or model to add |

<a name="SpinalRelationPtrLst+removeChild"></a>

### spinalRelationPtrLst.removeChild(node) ⇒ <code>Promise.&lt;Boolean&gt;</code>
Removes a child from the relation.

**Kind**: instance method of [<code>SpinalRelationPtrLst</code>](#SpinalRelationPtrLst)  
**Returns**: <code>Promise.&lt;Boolean&gt;</code> - A promise containing true if the node was a child  

| Param | Type | Description |
| --- | --- | --- |
| node | <code>SpinalNode</code> | Child to remove |

<a name="SpinalRelationPtrLst+removeChildren"></a>

### spinalRelationPtrLst.removeChildren(nodes) ⇒ <code>Promise.&lt;Array.&lt;Boolean&gt;&gt;</code>
Removes children from the relation.

**Kind**: instance method of [<code>SpinalRelationPtrLst</code>](#SpinalRelationPtrLst)  
**Returns**: <code>Promise.&lt;Array.&lt;Boolean&gt;&gt;</code> - A promise containing an array of boolean  

| Param | Type | Description |
| --- | --- | --- |
| nodes | <code>Array.&lt;SpinalNode&gt;</code> | Childs to remove |

<a name="SpinalRelationLstPtr"></a>

## SpinalRelationLstPtr
**Kind**: global class  

* [SpinalRelationLstPtr](#SpinalRelationLstPtr)
    * [new SpinalRelationLstPtr(name)](#new_SpinalRelationLstPtr_new)
    * [.getChildrenIds()](#SpinalRelationLstPtr+getChildrenIds) ⇒ <code>Array.&lt;String&gt;</code>
    * [.getChildren()](#SpinalRelationLstPtr+getChildren) ⇒ <code>Promise.&lt;Array.&lt;SpinalNode&gt;&gt;</code>
    * [.getChildrenInContext()](#SpinalRelationLstPtr+getChildrenInContext) ⇒ <code>Promise.&lt;Array.&lt;SpinalNode&gt;&gt;</code>
    * [.getType()](#SpinalRelationLstPtr+getType) ⇒ <code>Number</code>
    * [.addChild(node)](#SpinalRelationLstPtr+addChild) ⇒ <code>Promise.&lt;SpinalNode&gt;</code>
    * [.removeChild(node)](#SpinalRelationLstPtr+removeChild) ⇒ <code>Promise.&lt;Boolean&gt;</code>

<a name="new_SpinalRelationLstPtr_new"></a>

### new SpinalRelationLstPtr(name)
Constructor for the SpinalRelationLstPtr class.


| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | Name of the relation |

<a name="SpinalRelationLstPtr+getChildrenIds"></a>

### spinalRelationLstPtr.getChildrenIds() ⇒ <code>Array.&lt;String&gt;</code>
Retrieves all the ids of the children of the relation and return them inside an array.

**Kind**: instance method of [<code>SpinalRelationLstPtr</code>](#SpinalRelationLstPtr)  
**Returns**: <code>Array.&lt;String&gt;</code> - Array containing all the children ids of the relation  
<a name="SpinalRelationLstPtr+getChildren"></a>

### spinalRelationLstPtr.getChildren() ⇒ <code>Promise.&lt;Array.&lt;SpinalNode&gt;&gt;</code>
Return all the children of the relation.

**Kind**: instance method of [<code>SpinalRelationLstPtr</code>](#SpinalRelationLstPtr)  
**Returns**: <code>Promise.&lt;Array.&lt;SpinalNode&gt;&gt;</code> - The children of the relation  
<a name="SpinalRelationLstPtr+getChildrenInContext"></a>

### spinalRelationLstPtr.getChildrenInContext() ⇒ <code>Promise.&lt;Array.&lt;SpinalNode&gt;&gt;</code>
Return all the children of the relation associated to a certain context.

**Kind**: instance method of [<code>SpinalRelationLstPtr</code>](#SpinalRelationLstPtr)  
**Returns**: <code>Promise.&lt;Array.&lt;SpinalNode&gt;&gt;</code> - The children of the relation  
<a name="SpinalRelationLstPtr+getType"></a>

### spinalRelationLstPtr.getType() ⇒ <code>Number</code>
Returns the type of the relation.

**Kind**: instance method of [<code>SpinalRelationLstPtr</code>](#SpinalRelationLstPtr)  
**Returns**: <code>Number</code> - Type of the relation  
<a name="SpinalRelationLstPtr+addChild"></a>

### spinalRelationLstPtr.addChild(node) ⇒ <code>Promise.&lt;SpinalNode&gt;</code>
Adds a child to the relation.

**Kind**: instance method of [<code>SpinalRelationLstPtr</code>](#SpinalRelationLstPtr)  
**Returns**: <code>Promise.&lt;SpinalNode&gt;</code> - Promise containing the node that was added  

| Param | Type | Description |
| --- | --- | --- |
| node | <code>SpinalNode</code> \| <code>Model</code> | Node or model to add |

<a name="SpinalRelationLstPtr+removeChild"></a>

### spinalRelationLstPtr.removeChild(node) ⇒ <code>Promise.&lt;Boolean&gt;</code>
Removes a child from the relation.

**Kind**: instance method of [<code>SpinalRelationLstPtr</code>](#SpinalRelationLstPtr)  
**Returns**: <code>Promise.&lt;Boolean&gt;</code> - A promise containing true if the node was a child  

| Param | Type | Description |
| --- | --- | --- |
| node | <code>SpinalNode</code> | Child to remove |

<a name="SpinalRelationRef"></a>

## SpinalRelationRef
**Kind**: global class  

* [SpinalRelationRef](#SpinalRelationRef)
    * [new SpinalRelationRef(name)](#new_SpinalRelationRef_new)
    * [.getChildrenIds()](#SpinalRelationRef+getChildrenIds) ⇒ <code>Array.&lt;String&gt;</code>
    * [.getChildren()](#SpinalRelationRef+getChildren) ⇒ <code>Promise.&lt;Array.&lt;SpinalNode&gt;&gt;</code>
    * [.getChildrenInContext(context)](#SpinalRelationRef+getChildrenInContext) ⇒ <code>Promise.&lt;Array.&lt;SpinalNode&gt;&gt;</code>
    * [.getType()](#SpinalRelationRef+getType) ⇒ <code>Number</code>
    * [.addChild(node)](#SpinalRelationRef+addChild) ⇒ <code>Promise.&lt;SpinalNode&gt;</code>
    * [.removeChild(node)](#SpinalRelationRef+removeChild) ⇒ <code>Promise.&lt;Boolean&gt;</code>

<a name="new_SpinalRelationRef_new"></a>

### new SpinalRelationRef(name)
Constructor for the SpinalRelationRef class.


| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | Name of the relation |

<a name="SpinalRelationRef+getChildrenIds"></a>

### spinalRelationRef.getChildrenIds() ⇒ <code>Array.&lt;String&gt;</code>
Retrieves all the ids of the children of the relation and return them inside an array.

**Kind**: instance method of [<code>SpinalRelationRef</code>](#SpinalRelationRef)  
**Returns**: <code>Array.&lt;String&gt;</code> - Array containing all the children ids of the relation  
<a name="SpinalRelationRef+getChildren"></a>

### spinalRelationRef.getChildren() ⇒ <code>Promise.&lt;Array.&lt;SpinalNode&gt;&gt;</code>
Return all the children of the relation.

**Kind**: instance method of [<code>SpinalRelationRef</code>](#SpinalRelationRef)  
**Returns**: <code>Promise.&lt;Array.&lt;SpinalNode&gt;&gt;</code> - The children of the relation  
<a name="SpinalRelationRef+getChildrenInContext"></a>

### spinalRelationRef.getChildrenInContext(context) ⇒ <code>Promise.&lt;Array.&lt;SpinalNode&gt;&gt;</code>
Return all the children of the relation associated to a certain context.

**Kind**: instance method of [<code>SpinalRelationRef</code>](#SpinalRelationRef)  
**Returns**: <code>Promise.&lt;Array.&lt;SpinalNode&gt;&gt;</code> - The children of the relation associated to the context  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>SpinalContext</code> | The context to use for the search |

<a name="SpinalRelationRef+getType"></a>

### spinalRelationRef.getType() ⇒ <code>Number</code>
Returns the type of the relation.

**Kind**: instance method of [<code>SpinalRelationRef</code>](#SpinalRelationRef)  
**Returns**: <code>Number</code> - Type of the relation  
<a name="SpinalRelationRef+addChild"></a>

### spinalRelationRef.addChild(node) ⇒ <code>Promise.&lt;SpinalNode&gt;</code>
Adds a child to the relation.

**Kind**: instance method of [<code>SpinalRelationRef</code>](#SpinalRelationRef)  
**Returns**: <code>Promise.&lt;SpinalNode&gt;</code> - Promise containing the node that was added  

| Param | Type | Description |
| --- | --- | --- |
| node | <code>SpinalNode</code> \| <code>Model</code> | Node or model to add |

<a name="SpinalRelationRef+removeChild"></a>

### spinalRelationRef.removeChild(node) ⇒ <code>Promise.&lt;Boolean&gt;</code>
Removes a child from the relation.

**Kind**: instance method of [<code>SpinalRelationRef</code>](#SpinalRelationRef)  
**Returns**: <code>Promise.&lt;Boolean&gt;</code> - A promise containing true if the node was a child  

| Param | Type | Description |
| --- | --- | --- |
| node | <code>SpinalNode</code> | Child to remove |

