/** English counterparts in the same stable order as the original glossary. */
export const glossaryEnglish: [string, string][] = [
  [
    'Data type',
    'The category of a value, determining its supported operations: int, float, str, bool, list, tuple, dict, set.',
  ],
  [
    'Type casting',
    'Explicitly converting a value with functions such as int(), float(), str(), and bool().',
  ],
  [
    'Operator precedence',
    'The evaluation order: **, then * / // %, then + -, comparisons, not, and, or.',
  ],
  [
    'Mutable / immutable',
    'Mutable objects such as lists, dictionaries and sets can change in place. Immutable objects cannot. A tuple may contain mutable objects.',
  ],
  [
    'Slicing',
    'Extracting part of a sequence with [start:stop:step]. The stop index is excluded.',
  ],
  [
    'Conditional statement',
    'An if / elif / else structure executes a block when its condition is true.',
  ],
  [
    'Loop / iteration',
    'Repeating code: for iterates over an iterable; while repeats while its condition is true.',
  ],
  [
    'break / continue / pass',
    'break exits the loop; continue advances to the next iteration; pass is an empty placeholder statement.',
  ],
  [
    'File opening mode',
    'The mode argument to open(): r reads, w writes and truncates, a appends, x creates exclusively, and b selects binary mode.',
  ],
  [
    'f-string',
    'A string prefixed with f whose expressions inside braces are evaluated and formatted.',
  ],
  [
    'Docstring',
    'A string as the first statement of a function, class or module describing its purpose. Available through help() and __doc__.',
  ],
  [
    'Default parameter',
    'A function parameter with a predefined value used when the caller omits its argument.',
  ],
  [
    'Exception',
    'A runtime error, such as ValueError or ZeroDivisionError, that can be handled with try / except.',
  ],
  [
    'Syntax / runtime / logic error',
    'Syntax errors prevent parsing; runtime errors raise exceptions during execution; logic errors produce incorrect results.',
  ],
  [
    'Module',
    'A reusable .py file containing functions, classes and variables, loaded with import. Standard modules include math, random, datetime, os, and sys.',
  ],
  [
    'Primary key',
    'A column or combination of columns that uniquely identifies each row. Primary keys cannot contain NULL or duplicate values.',
  ],
  [
    'Foreign key',
    'A column or combination of columns referencing a primary or unique key, enforcing referential integrity.',
  ],
  [
    'Normalization',
    'Organizing tables to reduce redundancy: 1NF uses atomic values; 2NF removes partial dependencies; 3NF removes transitive dependencies.',
  ],
  [
    'Entity relationship diagram (ERD)',
    'A diagram of entities, attributes and relationships: one-to-one, one-to-many, and many-to-many.',
  ],
  [
    'DDL (Data Definition Language)',
    'Statements defining database structure, such as CREATE, ALTER, DROP, and TRUNCATE.',
  ],
  [
    'Constraint',
    'A data rule such as PRIMARY KEY, FOREIGN KEY, UNIQUE, NOT NULL, CHECK, or DEFAULT.',
  ],
  [
    'Index',
    'A structure that accelerates searches on one or more columns, at the cost of storage and write maintenance.',
  ],
  ['View', 'A named saved SELECT query used as a virtual table.'],
  [
    'Aggregate function',
    'A function computing one value from a group of rows, such as COUNT, SUM, AVG, MIN, or MAX.',
  ],
  [
    'JOIN',
    'Combining rows from tables: INNER keeps matches, LEFT/RIGHT retains all rows from one side, CROSS produces all combinations.',
  ],
  [
    'GROUP BY / HAVING',
    'GROUP BY groups rows with shared values; HAVING filters resulting groups, often using aggregate results.',
  ],
  [
    'DML (Data Manipulation Language)',
    'Statements used to manipulate data: INSERT, UPDATE, DELETE, and SELECT for querying.',
  ],
  [
    'Transaction',
    'Operations treated as one unit: commit successful changes with COMMIT or undo uncommitted changes with ROLLBACK.',
  ],
  [
    'NULL',
    'A marker for an absent or unknown value. Test using IS NULL or IS NOT NULL rather than equality.',
  ],
  [
    'LAN / WAN',
    'A LAN covers a local area such as a school. A WAN connects networks over a wide area.',
  ],
  [
    'IPv4 address',
    'A 32-bit logical address written as four decimal octets, with network and host portions determined by its prefix.',
  ],
  [
    'Subnet mask / CIDR',
    'The network prefix length; 255.255.255.0 is /24. Conventional usable IPv4 host counts are 2^(32-prefix)-2, with exceptions such as /31 and /32.',
  ],
  ['Default gateway', 'The router address used by a host to reach other networks.'],
  [
    'Switch',
    'A layer-2 device that learns MAC addresses and forwards known unicast frames toward the destination port.',
  ],
  [
    'Router',
    'A layer-3 device forwarding packets between networks using IP addresses and a routing table.',
  ],
  [
    'MAC address',
    'A link-layer address, typically 48 bits. It may be manufacturer-assigned, locally administered, or randomized.',
  ],
  [
    'OSI model',
    'A seven-layer model: Physical, Data Link, Network, Transport, Session, Presentation, Application.',
  ],
  [
    'TCP / UDP',
    'Transport protocols. TCP provides reliable ordered delivery; UDP uses connectionless datagrams without delivery guarantees. Neither alone provides encryption.',
  ],
  [
    'DNS',
    'The service resolving domain names to IP addresses and other records. Commonly uses port 53.',
  ],
  [
    'DHCP',
    'A protocol automatically supplying IP addresses, subnet masks, gateways and DNS server settings.',
  ],
  [
    'Firewall',
    'Hardware or software allowing or blocking traffic according to rules such as addresses, ports and protocols.',
  ],
  [
    'VPN',
    'A virtual private network: an encrypted tunnel over another network to protect traffic in transit.',
  ],
  [
    'ping / tracert',
    'ping tests ICMP Echo reachability; tracert / traceroute identifies intermediate hops toward a destination.',
  ],
  [
    'APIPA',
    'A link-local 169.254.x.x address assigned by Windows when DHCP configuration is unavailable.',
  ],
  [
    'Semantic element',
    'An HTML element describing content roles, such as header, nav, main, article, section, aside, or footer.',
  ],
  [
    'Form validation',
    'Checking data before submission using attributes such as required, pattern, min, max, type=email, or JavaScript. Server validation is still necessary.',
  ],
  [
    '<canvas>',
    'A bitmap drawing surface controlled through JavaScript, commonly using getContext("2d").',
  ],
  ['SVG', 'An XML-based vector graphics format that scales without losing quality.'],
  [
    'Box model',
    'Each element has content, padding, border and margin. border-box includes padding and border in the declared width.',
  ],
  [
    'Specificity',
    'A priority calculation between competing selectors: IDs outweigh classes, attributes and pseudo-classes, which outweigh type selectors. Other cascade rules also apply.',
  ],
  [
    'Flexbox',
    'A one-dimensional layout model: justify-content aligns on the main axis, align-items on the cross axis.',
  ],
  [
    'Media query',
    'CSS rules applied under conditions such as viewport width or orientation; a foundation of responsive design.',
  ],
  [
    'DOM',
    'Document Object Model: the page represented as an object tree that JavaScript can read and modify.',
  ],
  ['Event', 'An action such as click, input or submit, handled with an event listener.'],
  [
    'localStorage / sessionStorage',
    'Browser key-value storage. localStorage persists across sessions; sessionStorage lasts for a page session in a tab.',
  ],
  [
    'Service worker',
    'A background script separate from the page that can intercept network requests for caching and offline behavior.',
  ],
  [
    'Web app manifest',
    'A JSON file describing a progressive web app’s name, icons, start URL and display behavior.',
  ],
  [
    'Driver',
    'Software enabling the operating system to communicate with hardware, managed in Windows through Device Manager.',
  ],
  [
    'Device Manager',
    'A Windows console listing installed hardware and allowing driver updates, disabling and rollback.',
  ],
  [
    'Peripheral',
    'An external device such as a printer, monitor or headset connected through USB, USB-C, HDMI, audio or another interface.',
  ],
  [
    'Windows Update',
    'The service downloading and installing Windows security, quality and feature updates.',
  ],
  [
    'NTFS / FAT32 / exFAT',
    'File systems. NTFS offers permissions, encryption and journaling. FAT32 has a single-file limit just below 4 GiB. exFAT suits removable storage without NTFS-style permissions.',
  ],
  [
    'NTFS permissions',
    'File and folder permissions such as Read, Write, Modify and Full Control. Network access is also limited by share permissions.',
  ],
  [
    'Full / incremental / differential backup',
    'Full copies all selected data; incremental copies changes since the last backup; differential copies changes since the last full backup.',
  ],
  [
    'BitLocker',
    'Windows volume encryption. Keep the recovery key in a safe, independently accessible location.',
  ],
  [
    'UAC (User Account Control)',
    'A mechanism requesting confirmation or credentials before an application receives administrator privileges.',
  ],
  [
    'Multifactor authentication (MFA)',
    'Verifying identity using factors from different categories: something you know, have, or are.',
  ],
  [
    'Safe Mode',
    'Windows startup with a minimal set of drivers and services for diagnosing problems.',
  ],
  [
    'System Restore',
    'Restores system configuration to an earlier restore point. It does not replace a backup of personal files.',
  ],
  [
    'Event Viewer',
    'The Windows console displaying Application, System and Security event logs for troubleshooting.',
  ],
]
